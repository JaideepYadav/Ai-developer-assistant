<script lang="ts">
  let isDark = $state(
    typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
  );

  function toggle() {
    isDark = !isDark;
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }
</script>

<header
  class="sticky top-0 z-30 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl dark:border-slate-700/80 dark:bg-slate-900/85"
>
  <div class="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
    <div class="flex items-center gap-3">
      <div
        class="flex size-10 items-center justify-center rounded-2xl bg-slate-950 text-sm font-black text-white"
      >
        AI
      </div>
      <div>
        <p class="text-sm font-bold text-slate-950 dark:text-white">AI Commit & PR Generator</p>
        <p class="hidden text-xs text-slate-500 sm:block dark:text-slate-400">
          Developer workflow automation
        </p>
      </div>
    </div>

    <div class="flex items-center gap-3">
      <span
        class="hidden rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 md:inline-flex dark:bg-emerald-900/40 dark:text-emerald-300"
      >
        AI-Powered
      </span>
      <button
        onclick={toggle}
        aria-label="Toggle dark mode"
        class="focus-visible:ring-brand-600 flex size-9 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-950 focus:outline-none focus-visible:ring-2 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
      >
        {#if isDark}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-5"
          >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        {:else}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-5"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        {/if}
      </button>
    </div>
  </div>
</header>
