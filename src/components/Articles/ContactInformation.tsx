import { PrivateField, personal } from '@content';
import { IdentificationIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { cookies } from 'next/headers';
import { SectionHeading } from '../SectionHeading/SectionHeading';
import { AccessCodeForm } from './AccessCodeForm';
import { baseURL } from 'src/helpers/nextHelper';

interface ContactInformationProps {
  privateInformation?: PrivateField[];
}

export const ContactInformation: React.FC<ContactInformationProps> = async ({
  privateInformation,
}) => {
  const cookiesList = cookies();
  const accessCode = cookiesList.get('accessCode');
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
          <li>other private information(WIP)</li>
        ) : (
          <AccessCodeForm />
        )}

        {/* private access required */}
        {privateInformation?.map((privateField) => (
          <li className="mt-3" key={privateField.label}>
            <strong>{privateField.label}</strong>{' '}
            <div dangerouslySetInnerHTML={{ __html: privateField.body.html }} />
          </li>
        ))}
      </ul>
    </article>
  );
};
