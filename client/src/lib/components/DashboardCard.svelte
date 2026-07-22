<script lang="ts">
  interface Props {
    icon: string;
    title: string;
    description: string;
    action: string;
    href?: string;
  }

  let { icon, title, description, action, href }: Props = $props();
</script>

{#if href}
  <a
    {href}
    class="shadow-card hover:border-brand-100 group block cursor-pointer rounded-3xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-brand-800"
  >
    <div
      class="group-hover:bg-brand-50 group-hover:text-brand-700 mb-6 flex size-12 items-center justify-center rounded-2xl bg-slate-100 text-xl font-black text-slate-800 dark:bg-slate-800 dark:text-slate-200 dark:group-hover:bg-brand-900/30 dark:group-hover:text-brand-300"
    >
      {icon}
    </div>
    <h3 class="text-lg font-bold text-slate-950 dark:text-white">{title}</h3>
    <p class="mt-2 min-h-12 text-sm leading-6 text-slate-600 dark:text-slate-400">{description}</p>
    <div class="text-brand-600 mt-6 flex items-center gap-1 text-sm font-semibold">
      {action}
      <span class="transition group-hover:translate-x-1">&rarr;</span>
    </div>
  </a>
{:else}
  <article
    class="shadow-card hover:border-brand-100 group rounded-3xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-brand-800"
  >
    <div
      class="group-hover:bg-brand-50 group-hover:text-brand-700 mb-6 flex size-12 items-center justify-center rounded-2xl bg-slate-100 text-xl font-black text-slate-800 dark:bg-slate-800 dark:text-slate-200 dark:group-hover:bg-brand-900/30 dark:group-hover:text-brand-300"
    >
      {icon}
    </div>
    <h3 class="text-lg font-bold text-slate-950 dark:text-white">{title}</h3>
    <p class="mt-2 min-h-12 text-sm leading-6 text-slate-600 dark:text-slate-400">{description}</p>
  </article>
{/if}
