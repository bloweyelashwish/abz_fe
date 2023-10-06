import { FC, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { Button } from '~/components/ui/Button';
import type { FormEvent } from 'react';
import {
  FormBaseField,
  FormImageField,
  FormFieldGroup,
  FormRadioField,
} from '~/components/ui/Form';
import styles from './UserForm.module.scss';

import { EMAIL_PATTERN, PHONE_PATTERN, validateUploadedImage } from '~/utils';
import { createUser, getPositionsList, getUsers } from '~/services/axios';
import { Position } from '~/types';
import type { AxiosError } from 'axios';
import { useUserList } from '~/contexts/userListContext';
import successImage from '~/assets/successImage.svg';
import { ErrorMessage } from '~/components/ui/ErrorMessage';
import { Preloader } from '~/components/ui/Preloader';

interface UserFormDataShape {
  name: string;
  email: string;
  phone: string;
  photo: string | undefined;
  position_id: string;
}

const userNameRules = {
  required: 'Name is required',
  minLength: {
    value: 2,
    message: 'Name must be at least 2 characters',
  },
  maxLength: {
    value: 60,
    message: 'Name must be at most 60 characters',
  },
};

const userEmailRules = {
  required: 'Email is required',
  minLength: {
    value: 2,
    message: 'Email must be at least 2 characters',
  },
  maxLength: {
    value: 100,
    message: 'Email must be at most 100 characters',
  },
  pattern: {
    value: EMAIL_PATTERN,
    message: 'Invalid email',
  },
};

const userPhoneRules = {
  required: 'Phone is required',
  pattern: {
    value: PHONE_PATTERN,
    message: 'Invalid phone number',
  },
};

export const UserForm: FC = () => {
  const [photoBlob, setPhotoBlob] = useState<File | undefined>(undefined);
  const [positions, setPositions] = useState<Position[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { defineUserList } = useUserList();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    watch,
    reset,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      photo: undefined,
      position_id: '',
    },
  });

  const simpleInputsWatcher = watch(['email', 'phone', 'position_id']);
  const hasEmptyFields = simpleInputsWatcher.some(
    (field) => field === '' || field === undefined
  );

  useEffect(() => {
    async function getPositions() {
      try {
        const response = await getPositionsList();

        if (response.success === false && response.message) {
          throw new Error(response.message);
        }

        setPositions(response.positions);
      } catch (e) {
        const error = e as AxiosError | Error;
        setErrorMessage(error.message ?? 'Something went wrong.');
      }
    }

    getPositions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (positions?.length) {
      reset({
        position_id: positions[0].id,
      });
    }
  }, [positions, reset]);

  const formSubmitHandler: SubmitHandler<UserFormDataShape> = async (data) => {
    data.photo = photoBlob as unknown as string;
    const formData = new FormData();

    Object.entries(data).forEach(([field, value]) => {
      formData.append(field, value);
    });

    try {
      setIsLoading(true);
      const response = await createUser(formData);

      if (response.success === false) {
        setErrorMessage(response.message);
      }

      const responseForUsers = await getUsers('?page=1&count=6');
      if (responseForUsers.success === false && responseForUsers.message) {
        setErrorMessage(responseForUsers.message);
      } else {
        defineUserList(responseForUsers.users);
        setIsSuccess(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  function onInvalidImageSize() {
    setError('photo', {
      type: 'manual',
      message: 'Invalid image size. Must be up to 5MB.',
    });
  }

  function onInvalidImageDimensions() {
    setError('photo', {
      type: 'manual',
      message: 'Invalid image dimensions. Must be at least 70x70.',
    });
  }

  function onImageValidated(blob: File) {
    setPhotoBlob(blob);
    clearErrors(['photo']);
  }

  function validatePhoto(event: FormEvent<HTMLInputElement>) {
    const { files } = event.target as HTMLInputElement;
    if (files && files.length > 0) {
      validateUploadedImage(
        files[0],
        onInvalidImageSize,
        onInvalidImageDimensions,
        onImageValidated
      );
    }
  }

  if (isLoading) {
    return (
      <div className={styles.loadingBlock}>
        <h3>Your data is being registered. This may take a minute.</h3>
        <Preloader />
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className={styles.successBlock}>
        <h3>User successfully registered</h3>
        <img src={successImage} alt="Form is successfully submitted" />
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(formSubmitHandler)}
      className={styles.userForm}
    >
      {errorMessage && (
        <div className={styles.errorMessage}>
          <ErrorMessage message={errorMessage} />
        </div>
      )}
      <fieldset className={styles.fieldset}>
        <div className={styles.formFields}>
          <Controller
            name="name"
            control={control}
            rules={userNameRules}
            render={({ field }) => (
              <FormBaseField
                type="text"
                {...field}
                label="Your name"
                placeholder="Jane Doe"
                error={errors?.name?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            rules={userEmailRules}
            render={({ field }) => (
              <FormBaseField
                type="email"
                {...field}
                label="Email"
                placeholder="test@mail.com"
                error={errors?.email?.message}
              />
            )}
          />
          <Controller
            name="phone"
            control={control}
            rules={userPhoneRules}
            render={({ field }) => (
              <FormBaseField
                type="tel"
                {...field}
                label="Phone"
                placeholder="+38054354435"
                error={errors?.phone?.message}
              />
            )}
          />
          {positions.length > 0 && !errorMessage && (
            <FormFieldGroup
              title="Select your position"
              error={errors?.position_id?.message}
            >
              {positions.map((position, idx) => (
                <Controller
                  key={position.id}
                  name="position_id"
                  rules={{ required: 'Position is requred' }}
                  control={control}
                  render={({ field }) => (
                    <FormRadioField
                      label={position.name}
                      {...field}
                      defaultChecked={idx === 0}
                      value={position.id}
                    />
                  )}
                />
              ))}
            </FormFieldGroup>
          )}

          <Controller
            name="photo"
            control={control}
            render={({ field }) => (
              <FormImageField
                {...field}
                label="Upload"
                placeholder={!photoBlob ? 'Upload your photo' : photoBlob.name}
                error={errors?.photo?.message}
                onChange={validatePhoto}
              />
            )}
          />
        </div>
      </fieldset>
      <div className={styles.action}>
        <Button
          type="submit"
          text="Sign up"
          disabled={
            hasEmptyFields || !photoBlob || Object.keys(errors).length > 0
          }
        />
      </div>
    </form>
  );
};
