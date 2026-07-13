<script lang="ts">
  import { onMount } from 'svelte';

  import Button from '$lib/components/Button.svelte';
  import NavBar from '$lib/components/NavBar.svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';

  import { getHistory, clearHistory, deleteHistory } from '$lib/utils/history';

  import type { GenerationResult } from '$lib/types/generation';

  let history = $state<GenerationResult[]>([]);
  let copyMessage = $state('');

  onMount(() => {
    history = getHistory();
  });

  function handleClearHistory() {
    clearHistory();
    history = [];
  }

  function handleDelete(id: string) {
    deleteHistory(id);
    history = getHistory();
  }

  async function copyItem(content: string) {
    try {
      await navigator.clipboard.writeText(content);
      copyMessage = 'Copied to clipboard.';

      setTimeout(() => {
        copyMessage = '';
      }, 2000);
    } catch {
      copyMessage = 'Unable to copy.';
    }
  }

  function getTypeLabel(type: string) {
    switch (type) {
      case 'commit':
        return '📝 Commit';

      case 'pull-request':
        return '📄 Pull Request';

      case 'explain':
        return '💡 Explain';

      case 'review':
        return '🔍 Code Review';

      default:
        return type;
    }
  }

  function formatDate(date: string) {
    return new Date(date).toLocaleString();
  }
</script>

<svelte:head>
  <title>History - AI Developer Assistant</title>
</svelte:head>

<div
  class="min-h-screen bg-[radial-gradient(circle_at_top_left,#dbeafe,transparent_30%),linear-gradient(180deg,#f8fafc,#eef2ff)]"
>
  <NavBar />

  <div class="flex min-h-[calc(100vh-4rem)]">
    <Sidebar />

    <main class="flex-1 px-4 py-6 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-5xl">
        <a
          href="/"
          class="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-950"
        >
          <span>&larr;</span>
          Back to Dashboard
        </a>

        <div
          class="shadow-card rounded-[2rem] border border-slate-200 bg-white/85 p-8 backdrop-blur"
        >
          <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 class="text-3xl font-black tracking-tight text-slate-950">History</h1>

              <p class="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                View all previously generated commits, pull requests, code explanations and code
                reviews.
              </p>
            </div>

            <Button
              variant="secondary"
              onclick={handleClearHistory}
              disabled={history.length === 0}
            >
              Clear History
            </Button>
          </div>

          {#if copyMessage}
            <p class="mt-4 text-sm text-green-600">
              {copyMessage}
            </p>
          {/if}

          {#if history.length === 0}
            <div
              class="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center"
            >
              <h2 class="text-lg font-semibold text-slate-900">No history yet</h2>

              <p class="mt-2 text-slate-600">
                Generate a Commit, Pull Request, Explain Code or Review to see your history here.
              </p>
            </div>
          {:else}
            <div class="mt-8 space-y-6">
              {#each history as item}
                <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div class="flex-1">
                      <p class="text-brand-700 text-xs font-bold uppercase tracking-[0.2em]">
                        {getTypeLabel(item.type)}
                      </p>

                      <h2 class="mt-2 text-lg font-bold text-slate-900">
                        {item.title}
                      </h2>

                      <p class="mt-2 text-sm text-slate-500">
                        {formatDate(item.createdAt)}
                      </p>
                    </div>

                    <div class="flex gap-2">
                      <Button variant="secondary" onclick={() => copyItem(item.content)}>
                        Copy
                      </Button>

                      <Button variant="ghost" onclick={() => handleDelete(item.id)}>Delete</Button>
                    </div>
                  </div>

                  <div class="mt-5 max-h-64 overflow-y-auto rounded-xl bg-slate-50 p-4">
                    <pre
                      class="whitespace-pre-wrap break-words font-mono text-sm leading-relaxed text-slate-900">{item.content}</pre>
                  </div>
                </div>
              {/each}
            </div>
          {/if}
        </div>
      </div>
    </main>
  </div>
</div>
