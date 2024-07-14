'use client';
import React from 'react';
import { useForm, Resolver } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Button from '../Button/Button';
import { Input } from '../Input/Input';
import { Spinner } from '../Spinner/Spinner';

const initialFormValues = {
  accessCode: '',
};

type FormValues = typeof initialFormValues;

const validateCode: Resolver<FormValues> = async ({ accessCode }) => {
  console.log('accessCode', accessCode);

  try {
    const result = (await fetch(`/api/privateInfo?accessCode=${accessCode}`))
      .ok;
    console.log('result', result);

    return {
      values: result ? {} : { accessCode },
      errors: result
        ? {}
        : { accessCode: { message: 'Invalid access code', type: 'validate' } },
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    return {
      values: {},
      errors: {
        accessCode: {
          message: 'Something went wrong, please try again later',
          type: 'value',
        },
      },
    };
  }
};

export const AccessCodeForm: React.FC = () => {
  const router = useRouter();

  const {
    handleSubmit,
    formState: { isSubmitting, isValidating, errors, isSubmitSuccessful },
    register,
  } = useForm<FormValues>({
    resolver: validateCode,
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const onSubmit = handleSubmit(() => {
    router.refresh();
  });

  const isLoading = isValidating || isSubmitting;
  const disabled = isLoading || isSubmitSuccessful;
  return isSubmitSuccessful ? (
    <Spinner />
  ) : (
    <form>
      <div className={'flex'}>
        <Input
          {...register('accessCode')}
          className={'rounded-r-none'}
          placeholder={'Access Code'}
          disabled={disabled}
        />
        <Button
          onClick={onSubmit}
          disabled={disabled}
          className={'rounded-l-none'}
          size={'sm'}
        >
          {isLoading ? <Spinner /> : 'Submit'}
        </Button>
      </div>
      <div>
        {errors.accessCode && (
          <p className={'text-danger-7'}>{errors.accessCode.message}</p>
        )}
      </div>
    </form>
  );
};
