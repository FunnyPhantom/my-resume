import { PrivateField, personal, allPrivateFields } from '@content';
import { IdentificationIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { cookies } from 'next/headers';
import { SectionHeading } from '../SectionHeading/SectionHeading';
import { AccessCodeForm } from './AccessCodeForm';
import { baseURL } from 'src/helpers/nextHelper';

export const ContactInformation: React.FC = async () => {
  console.log('inside ContactInformation');
  const accessCode = cookies().get('accessCode');
  console.log('ContactInfo[accessCode]', accessCode);

  const hasAccessCode = accessCode && accessCode.value.length > 0;
  let isCodeValid = false;
  try {
    isCodeValid =
      Boolean(hasAccessCode) &&
      (
        await fetch(
          `${baseURL()}/api/privateInfo?accessCode=${accessCode?.value}`,
        )
      ).ok;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
  let privateFields: PrivateField[] = [];

  if (isCodeValid) {
    privateFields = allPrivateFields ?? [];
  }

  return (
    <article>
      <SectionHeading
        Icon={IdentificationIcon}
        level={3}
        text="Contact Information"
      />

      <ul className="mt-2">
        <li>
          <strong>Location:</strong> {personal.location}
        </li>
        {isCodeValid ? (
          privateFields.map((privateField) => (
            <li className="mt-3" key={privateField.label}>
              <strong>{privateField.label}:</strong>{' '}
              {privateField?.link ? (
                <a className={'mt-[-2px]'} href={privateField.link}>
                  {privateField.value}
                </a>
              ) : (
                privateField.value
              )}
            </li>
          ))
        ) : (
          <AccessCodeForm />
        )}
      </ul>
    </article>
  );
};
