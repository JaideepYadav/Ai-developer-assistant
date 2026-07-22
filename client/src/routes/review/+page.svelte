<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import NavBar from '$lib/components/NavBar.svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import TextArea from '$lib/components/TextArea.svelte';
  import { generateReview } from '$lib/services/api';
  import type { GenerationResult } from '$lib/types/generation';
  import { saveHistory } from '$lib/utils/history';

  let codeInput = $state('');
  let isReviewing = $state(false);
  let result = $state<GenerationResult | null>(null);
  let errorMessage = $state('');

  async function handleReview() {
    errorMessage = '';
    result = null;

    if (!codeInput.trim()) {
      errorMessage = 'Paste code before requesting a review.';
      return;
    }

    isReviewing = true;

    try {
      result = await generateReview({ context: codeInput });
      saveHistory({ ...result, input: codeInput });
    } catch (error) {
      errorMessage = error instanceof Error ? error.message : 'Failed to review code.';
    } finally {
      isReviewing = false;
    }
  }
  let copyMessage = $state('');

  async function copyReview() {
    if (!result) return;

    try {
      await navigator.clipboard.writeText(result.content);
      copyMessage = 'Copied to clipboard.';
    } catch (error) {
      console.error(error);
      copyMessage = 'Unable to copy.';
    }
  }
</script>

<svelte:head>
  <title>Code Review - AI Developer Assistant</title>
</svelte:head>

<div class="min-h-screen" style="background: var(--color-bg-gradient);">
  <NavBar />

  <div class="flex min-h-[calc(100vh-4rem)]">
    <Sidebar />

    <main class="flex-1 px-4 py-6 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-4xl">
        <a
          href="/"
          class="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
        >
          <span>&larr;</span>
          Back to Dashboard
        </a>

        <div
          class="shadow-card rounded-[2rem] border border-slate-200 bg-white/85 p-8 backdrop-blur dark:border-slate-700 dark:bg-slate-900/85"
        >
          <h1 class="text-3xl font-black tracking-tight text-slate-950 dark:text-white">
            Code Review
          </h1>
          <p class="mt-3 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-400">
            Submit code for an automated review that checks for correctness, maintainability, and
            potential issues.
          </p>

          <div class="mt-6">
            <TextArea
              id="review-input"
              label="Code to review"
              bind:value={codeInput}
              placeholder="Paste your code here..."
              rows={10}
            />
          </div>

          <div class="mt-5">
            <Button onclick={handleReview} disabled={isReviewing}>
              {isReviewing ? 'Reviewing...' : 'Review Code'}
            </Button>
          </div>

          {#if errorMessage}
            <div
              class="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/30"
            >
              <p class="text-sm font-medium text-red-700 dark:text-red-300">{errorMessage}</p>
            </div>
          {/if}

          {#if isReviewing}
            <div
              class="border-brand-100 bg-brand-50/80 dark:border-brand-700 dark:bg-brand-900/20 mt-6 animate-pulse rounded-2xl border p-6"
            >
              <div class="mb-4 h-4 w-48 rounded bg-slate-200 dark:bg-slate-700"></div>
              <div class="space-y-3">
                <div class="h-3 w-full rounded bg-slate-200 dark:bg-slate-700"></div>
                <div class="h-3 w-5/6 rounded bg-slate-200 dark:bg-slate-700"></div>
                <div class="h-3 w-4/6 rounded bg-slate-200 dark:bg-slate-700"></div>
              </div>
            </div>
          {/if}

          {#if result}
            <div
              class="border-brand-100 bg-brand-50/80 dark:border-brand-700 dark:bg-brand-900/30 mt-6 rounded-2xl border p-6"
            >
              <div class="mb-4 flex items-start justify-between">
                <p class="text-brand-700 text-xs font-bold uppercase tracking-[0.2em]">
                  {result.title}
                </p>
                <Button variant="secondary" onclick={copyReview}>Copy</Button>
              </div>
              <div class="max-h-96 overflow-y-auto rounded-xl bg-white/60 p-4 dark:bg-slate-800/60">
                <pre
                  class="whitespace-pre-wrap break-words font-mono text-sm leading-relaxed text-slate-900 dark:text-slate-200">{result.content}</pre>
              </div>
              {#if copyMessage}
                <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">{copyMessage}</p>
              {/if}
            </div>
          {/if}
        </div>
      </div>
    </main>
  </div>
</div>
