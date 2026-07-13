<script lang="ts">
  import Button from './Button.svelte';

  interface Props {
    icon: string;
    title: string;
    description: string;
    action: string;
  }

  let { icon, title, description, action }: Props = $props();
</script>

<article
  class="shadow-card hover:border-brand-100 group rounded-3xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1"
>
  <div
    class="group-hover:bg-brand-50 group-hover:text-brand-700 mb-6 flex size-12 items-center justify-center rounded-2xl bg-slate-100 text-xl font-black text-slate-800"
  >
    {icon}
  </div>
  <h3 class="text-lg font-bold text-slate-950">{title}</h3>
  <p class="mt-2 min-h-12 text-sm leading-6 text-slate-600">{description}</p>
  <Button class="mt-6 w-full">{action}</Button>
</article>
