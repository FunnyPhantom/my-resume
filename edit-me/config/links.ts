import {
  SiGithub,
  SiInstagram,
  SiLinkedin,
  SiNpm,
  SiX,
  SiYoutube,
} from '@icons-pack/react-simple-icons';
import { CMSLink } from 'edit-me/types/CMSLink';

export const LinkedInLink: CMSLink = {
  href: 'https://www.linkedin.com/in/mohamova',
  icon: SiLinkedin,
  title: 'LinkedIn',
};

export const links: CMSLink[] = [
  {
    href: 'https://github.com/funnyPhantom',
    icon: SiGithub,
    title: 'GitHub',
  },
  LinkedInLink,
  {
    href: 'https://x.com/moha_movahed',
    icon: SiX,
    title: 'X',
  },
  {
    href: 'https://www.youtube.com/@moha_mova/',
    icon: SiYoutube,
    title: 'YouTube',
  },
];
