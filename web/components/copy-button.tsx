'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CheckIcon, ClipboardIcon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

const CopyButton = () => {
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [hasCopied]);

  const copyCommand = useCallback((pm: 'pnpm' | 'yarn' | 'bun' | 'npx') => {
    navigator.clipboard.writeText(`${pm} create-sugarcoat-app@latest`);
    setHasCopied(true);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='relative z-10 h-8 w-8 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-5'
        >
          {hasCopied ? (
            <CheckIcon className='h-3 w-3' />
          ) : (
            <ClipboardIcon className='h-3 w-3' />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-32'>
        {(['npx', 'pnpm', 'bun', 'yarn'] as const).map((pm) => (
          <DropdownMenuItem key={pm} onClick={() => copyCommand(pm)}>
            <span>{pm}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CopyButton;
