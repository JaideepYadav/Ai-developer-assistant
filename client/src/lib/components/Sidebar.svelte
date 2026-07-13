<script lang="ts">
  import { page } from '$app/stores';

  const items = [
    { label: 'Dashboard', href: '/' },
    { label: 'Explain Code', href: '/explain' },
    { label: 'Code Review', href: '/review' },
    { label: 'History', href: '/history' }
    //{ label: 'Settings', href: '/' }
  ];

  let currentPath = $derived($page.url.pathname);
</script>

<aside
  class="hidden w-72 shrink-0 border-r border-slate-200/80 bg-white/75 p-5 backdrop-blur-xl lg:block"
>
  <nav class="space-y-2" aria-label="Primary navigation">
    {#each items as item}
      <a
        href={item.href}
        class="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition {currentPath ===
        item.href
          ? 'shadow-card bg-slate-950 text-white'
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'}"
      >
        <span
          class="size-2 rounded-full {currentPath === item.href ? 'bg-brand-100' : 'bg-slate-300'}"
        ></span>
        {item.label}
      </a>
    {/each}
  </nav>
</aside>
