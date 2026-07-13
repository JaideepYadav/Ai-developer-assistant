<script lang="ts">
  const items = [
    'Dashboard',
    'Commit Generator',
    'PR Generator',
    'Code Review',
    'History',
    'Settings'
  ];
</script>

<aside
  class="hidden w-72 shrink-0 border-r border-slate-200/80 bg-white/75 p-5 backdrop-blur-xl lg:block"
>
  <nav class="space-y-2" aria-label="Primary navigation">
    {#each items as item, index}
      <a
        href="/"
        class="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition {index ===
        0
          ? 'shadow-card bg-slate-950 text-white'
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'}"
      >
        <span class="size-2 rounded-full {index === 0 ? 'bg-brand-100' : 'bg-slate-300'}"></span>
        {item}
      </a>
    {/each}
  </nav>
</aside>
