<script lang="ts">
  import { cn } from '$lib/utils/cn';

  interface Props {
    variant?: 'primary' | 'secondary' | 'ghost';
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    onclick?: (event: MouseEvent) => void;
    class?: string;
    children?: import('svelte').Snippet;
  }

  let {
    variant = 'primary',
    type = 'button',
    disabled = false,
    onclick,
    class: className = '',
    children
  }: Props = $props();

  const variants = {
    primary: 'bg-brand-600 text-white shadow-sm hover:bg-brand-700 focus-visible:ring-brand-600',
    secondary:
      'bg-white text-slate-800 ring-1 ring-slate-200 hover:bg-slate-50 focus-visible:ring-brand-600',
    ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-950 focus-visible:ring-slate-400'
  };
</script>

<button
  {type}
  {disabled}
  {onclick}
  class={cn(
    'inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60',
    variants[variant],
    className
  )}
>
  {@render children?.()}
</button>
