'use client';

interface ToolLogoProps {
  slug: string;
  title: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function ToolLogo({ slug, title, size = 'md', className = '' }: ToolLogoProps) {
  const sizeMap = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-xl',
  };

  const iconSizeMap = {
    sm: 16,
    md: 20,
    lg: 26,
    xl: 36,
  };

  const iconPx = iconSizeMap[size];

  // Specific SVGs for well-known developer brands
  switch (slug) {
    case 'github-copilot':
    case 'github-student-developer-pack':
      return (
        <div className={`${sizeMap[size]} rounded-xl bg-[#181717] border border-white/10 flex items-center justify-center text-white shrink-0 shadow-md ${className}`}>
          <svg width={iconPx} height={iconPx} viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
        </div>
      );

    case 'chatgpt-edu':
      return (
        <div className={`${sizeMap[size]} rounded-xl bg-[#10a37f] border border-white/10 flex items-center justify-center text-white shrink-0 shadow-md ${className}`}>
          <svg width={iconPx} height={iconPx} viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1683a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4947zm-9.6647-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1448-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1683a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.6667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1635a.0804.0804 0 0 1-.038-.0567V6.0748a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.4598a.7948.7948 0 0 0-.3927.6813v6.7219zm1.0975-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
          </svg>
        </div>
      );

    case 'notion-ai':
      return (
        <div className={`${sizeMap[size]} rounded-xl bg-white text-black border border-black/10 flex items-center justify-center font-serif font-black shrink-0 shadow-md ${className}`}>
          <span className="text-xl">N</span>
        </div>
      );

    case 'azure-for-students':
      return (
        <div className={`${sizeMap[size]} rounded-xl bg-linear-to-br from-[#0089D6] to-[#0072C6] border border-white/10 flex items-center justify-center text-white shrink-0 shadow-md ${className}`}>
          <svg width={iconPx} height={iconPx} viewBox="0 0 24 24" fill="currentColor">
            <path d="M13.05 4.24l-4.5 7.79 6.75 6.75h5.45l-7.7-14.54zm-4.7 1.84L2 18.78h4.64l4.08-7.07-2.37-5.63z" />
          </svg>
        </div>
      );

    case 'aws-educate':
      return (
        <div className={`${sizeMap[size]} rounded-xl bg-[#232F3E] border border-white/10 flex items-center justify-center text-[#FF9900] font-bold shrink-0 shadow-md ${className}`}>
          <span className="font-mono text-sm tracking-tighter">AWS</span>
        </div>
      );

    case 'digitalocean-student-credits':
      return (
        <div className={`${sizeMap[size]} rounded-xl bg-[#0080FF] border border-white/10 flex items-center justify-center text-white shrink-0 shadow-md ${className}`}>
          <svg width={iconPx} height={iconPx} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.04 0C5.41 0 .04 5.37.04 12c0 5.41 3.58 9.98 8.52 11.49v-4.4c-2.33-.5-3.83-2.42-3.83-4.8 0-2.8 2.27-5.07 5.07-5.07h2.24V0zm4.24 6.75v4.5h4.5c0-2.48-2.02-4.5-4.5-4.5zm0 6.75v4.5h4.5c0-2.48-2.02-4.5-4.5-4.5z" />
          </svg>
        </div>
      );

    case 'vercel':
      return (
        <div className={`${sizeMap[size]} rounded-xl bg-black border border-white/20 flex items-center justify-center text-white shrink-0 shadow-md ${className}`}>
          <svg width={iconPx} height={iconPx} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 1L24 22H0L12 1Z" />
          </svg>
        </div>
      );

    case 'netlify':
      return (
        <div className={`${sizeMap[size]} rounded-xl bg-[#00C7B7] border border-white/10 flex items-center justify-center text-black shrink-0 shadow-md ${className}`}>
          <svg width={iconPx} height={iconPx} viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.8 9.2l-3.3-3.3a.75.75 0 0 0-1.1.1L8.3 14.1l-2.4-2.4a.75.75 0 0 0-1.1 1.1l3 3c.3.3.8.3 1.1 0l6.7-8.5 2.2 2.2a.75.75 0 0 0 1-1.3z" />
          </svg>
        </div>
      );

    case 'figma-education':
      return (
        <div className={`${sizeMap[size]} rounded-xl bg-[#1E1E1E] border border-white/10 flex items-center justify-center shrink-0 shadow-md ${className}`}>
          <div className="grid grid-cols-2 gap-0.5 w-4 h-6">
            <div className="w-2 h-2 rounded-l-full bg-[#F24E1E]" />
            <div className="w-2 h-2 rounded-r-full bg-[#FF7262]" />
            <div className="w-2 h-2 rounded-l-full bg-[#A259FF]" />
            <div className="w-2 h-2 rounded-full bg-[#1ABCFE]" />
            <div className="w-2 h-2 rounded-l-full bg-[#0ACF83]" />
          </div>
        </div>
      );

    case 'jetbrains-all-products-pack':
      return (
        <div className={`${sizeMap[size]} rounded-xl bg-linear-to-tr from-[#FF318C] via-[#9B00E8] to-[#000000] border border-white/10 flex items-center justify-center text-white font-mono font-black text-xs shrink-0 shadow-md ${className}`}>
          JB
        </div>
      );

    case 'railway':
      return (
        <div className={`${sizeMap[size]} rounded-xl bg-[#13111C] border border-[#A855F7]/30 flex items-center justify-center text-purple-400 font-bold shrink-0 shadow-md ${className}`}>
          <svg width={iconPx} height={iconPx} viewBox="0 0 24 24" fill="currentColor">
            <path d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm4.5 2h11v-1.5h-11V14zm0-3.5h11V9h-11v1.5z" />
          </svg>
        </div>
      );

    case 'mongodb-atlas-free':
      return (
        <div className={`${sizeMap[size]} rounded-xl bg-[#001E2B] border border-[#00ED64]/30 flex items-center justify-center text-[#00ED64] shrink-0 shadow-md ${className}`}>
          <svg width={iconPx} height={iconPx} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2c-.3 0-.6.1-.8.4C9.5 4.5 5 11.2 5 15.6 5 19.1 8.1 22 12 22s7-2.9 7-6.4c0-4.4-4.5-11.1-6.2-13.2-.2-.3-.5-.4-.8-.4zm0 2.2c1.4 1.9 5 7.6 5 11.4 0 2.4-2.2 4.4-5 4.4s-5-2-5-4.4c0-3.8 3.6-9.5 5-11.4z" />
          </svg>
        </div>
      );

    case 'sendgrid-free':
      return (
        <div className={`${sizeMap[size]} rounded-xl bg-[#1A82E2] border border-white/10 flex items-center justify-center text-white shrink-0 shadow-md ${className}`}>
          <svg width={iconPx} height={iconPx} viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
          </svg>
        </div>
      );

    case 'freecodecamp':
      return (
        <div className={`${sizeMap[size]} rounded-xl bg-[#0A0A23] border border-white/10 flex items-center justify-center text-[#FEAC32] text-sm shrink-0 shadow-md ${className}`}>
          (;)
        </div>
      );

    default:
      return (
        <div className={`${sizeMap[size]} rounded-xl bg-linear-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 font-bold shrink-0 shadow-md ${className}`}>
          {title.charAt(0).toUpperCase()}
        </div>
      );
  }
}
