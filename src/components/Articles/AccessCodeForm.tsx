'use client';
import React from 'react';
import { useForm, Resolver } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Button from '../Button/Button';
import { Input } from '../Input/Input';
import { Spinner } from '../Spinner/Spinner';
import { personal } from '@content';
import { SiLinkedin, SiLinkedinHex } from '@icons-pack/react-simple-icons';
import { LinkedInLink } from 'edit-me/config/links';
import { twMerge } from 'tailwind-merge';

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
        : { accessCode: { message: 'Invalid contact code', type: 'validate' } },
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
  const [showForm, setShowForm] = React.useState(false);

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

  const inside = isSubmitSuccessful ? (
    <Spinner />
  ) : (
    <form>
      <div className={'flex'}>
        <Input
          {...register('accessCode')}
          className={'rounded-r-none'}
          placeholder={'Contact Code'}
          disabled={disabled}
        />
        <Button
          onClick={onSubmit}
          disabled={disabled}
          className={'text-nowrap rounded-l-none'}
          size={'sm'}
        >
          {isLoading ? <Spinner /> : 'Reveal Contact Info'}
        </Button>
      </div>
      <div>
        {errors.accessCode && (
          <p className={'text-danger-7'}>{errors.accessCode.message}</p>
        )}
      </div>
      <div className={'my-1'}>
        <div className={'text-sm'}>
          {"Don't"} have code? Message {personal.givenName} at{' '}
          <span
            className={twMerge(
              'inline-block',
              // 'after:absolute after:bottom-[-2px] after:left-0 after:h-[10px] after:w-[100%]',
              // "after:content-['']",
              // 'after:bg-accent-7 after:transition-opacity after:duration-300 after:ease-in-out',
            )}
          >
            <a href={LinkedInLink.href}>
              <SiLinkedin
                color={SiLinkedinHex}
                className={'mb-1 mr-1 inline size-3'}
              />
            </a>
            <a className={''} href={LinkedInLink.href}>
              {LinkedInLink.title}
            </a>
          </span>{' '}
          to get one! 👀
        </div>
      </div>
    </form>
  );

  return <div className={'my-2'}>{inside}</div>;
};
