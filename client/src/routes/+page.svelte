<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import DashboardCard from '$lib/components/DashboardCard.svelte';
  import NavBar from '$lib/components/NavBar.svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import TextArea from '$lib/components/TextArea.svelte';
  import { generateCommit, generatePR } from '$lib/services/api';
  import type { GenerationResult } from '$lib/types/generation';
  import { saveHistory } from '$lib/utils/history';

  const navCards = [
    {
      icon: 'EX',
      title: 'Explain Code',
      description:
        'Turn complex snippets into practical explanations for maintainers and reviewers.',
      action: 'Explain Code',
      href: '/explain'
    },
    {
      icon: 'RV',
      title: 'Review Code',
      description:
        'Surface review suggestions for correctness, maintainability, and missing tests.',
      action: 'Review Code',
      href: '/review'
    },
    {
      icon: 'HI',
      title: 'History',
      description:
        'Track generated outputs and revisit previous commit, PR, review, and explanation drafts.',
      action: 'View History',
      href: '/history'
    }
  ];

  let codeContext = $state('');
  let isGeneratingCommit = $state(false);
  let generatedCommit = $state<GenerationResult | null>(null);
  let isGeneratingPR = $state(false);
  let generatedPR = $state<GenerationResult | null>(null);
  let errorMessage = $state('');
  let copyMessage = $state('');

  async function handleGenerateCommit() {
    errorMessage = '';
    copyMessage = '';
    generatedCommit = null;

    if (!codeContext.trim()) {
      errorMessage = 'Paste a diff or code context before generating a commit message.';
      return;
    }

    isGeneratingCommit = true;

    try {
      generatedCommit = await generateCommit({ context: codeContext });
      saveHistory({ ...generatedCommit, input: codeContext });
    } catch (error) {
      errorMessage = error instanceof Error ? error.message : 'Failed to generate commit message.';
    } finally {
      isGeneratingCommit = false;
    }
  }
  async function handleGeneratePR() {
    errorMessage = '';
    copyMessage = '';
    generatedPR = null;

    if (!codeContext.trim()) {
      errorMessage = 'Paste a diff or code context before generating a pull request.';
      return;
    }

    isGeneratingPR = true;

    try {
      generatedPR = await generatePR({
        context: codeContext
      });
      saveHistory({ ...generatedPR, input: codeContext });
    } catch (error) {
      errorMessage = error instanceof Error ? error.message : 'Failed to generate pull request.';
    } finally {
      isGeneratingPR = false;
    }
  }

  async function copyGeneratedCommit() {
    if (!generatedCommit) return;

    try {
      await navigator.clipboard.writeText(generatedCommit.content);
      copyMessage = 'Copied to clipboard.';
    } catch {
      copyMessage = 'Unable to copy. Please copy the message manually.';
    }
  }
  async function copyGeneratedPR() {
    if (!generatedPR) return;

    try {
      await navigator.clipboard.writeText(generatedPR.content);
      copyMessage = 'Copied to clipboard.';
    } catch {
      copyMessage = 'Unable to copy. Please copy manually.';
    }
  }
</script>

<svelte:head>
  <title>AI Commit & PR Generator</title>
  <meta
    name="description"
    content="AI-powered commit messages, PR generation, code explanation and code review."
  />
</svelte:head>

<div class="min-h-screen" style="background: var(--color-bg-gradient);">
  <NavBar />

  <div class="flex min-h-[calc(100vh-4rem)]">
    <Sidebar />

    <main class="flex-1 px-4 py-6 sm:px-6 lg:px-8">
      <section class="mx-auto max-w-7xl">
        <div class="grid gap-6 lg:grid-cols-[1.35fr_0.65fr] lg:items-start">
          <div
            class="shadow-card self-start rounded-[2rem] bg-slate-950 p-8 text-white dark:bg-slate-800"
          >
            <p class="text-brand-100 text-sm font-semibold uppercase tracking-[0.24em]">
              <!--Production scaffold -->
            </p>
            <h1 class="mt-4 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
              Generate cleaner commits, PRs, reviews, and explanations.
            </h1>
            <p class="mt-5 max-w-2xl text-base leading-7 text-slate-300">
              A modern developer dashboard foundation ready for future OpenCode-powered generation
              workflows.
            </p>
            <!--<div class="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button>Start Generating</Button>
              <Button
                variant="ghost"
                class="bg-white/10 text-white hover:bg-white/15 hover:text-white">View Docs</Button
              >
            </div>-->
          </div>

          <div
            class="shadow-card rounded-[2rem] border border-slate-200 bg-white/85 p-6 backdrop-blur dark:border-slate-700 dark:bg-slate-900/85"
          >
            <h2 class="text-lg font-bold text-slate-950 dark:text-white">Quick Context</h2>
            <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Paste a diff or snippet to generate a concise Conventional Commit message.
            </p>
            <div class="mt-5">
              <TextArea
                id="code-context"
                label="Code or diff"
                bind:value={codeContext}
                placeholder="Paste code context here..."
              />
            </div>
            <div class="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div class="flex gap-3">
                <Button
                  onclick={handleGenerateCommit}
                  disabled={isGeneratingCommit || isGeneratingPR}
                >
                  {isGeneratingCommit ? 'Generating...' : 'Generate Commit'}
                </Button>

                <Button
                  variant="secondary"
                  onclick={handleGeneratePR}
                  disabled={isGeneratingCommit || isGeneratingPR}
                >
                  {isGeneratingPR ? 'Generating...' : 'Generate PR'}
                </Button>
              </div>
              {#if errorMessage}
                <p class="text-sm font-medium text-red-600">{errorMessage}</p>
              {/if}
            </div>

            {#if generatedCommit}
              <div
                class="border-brand-100 bg-brand-50/80 dark:border-brand-700 dark:bg-brand-900/30 mt-5 rounded-2xl border p-4"
              >
                <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p class="text-brand-700 text-xs font-bold uppercase tracking-[0.2em]">
                      {generatedCommit.title}
                    </p>
                    <p
                      class="mt-2 break-words font-mono text-sm font-semibold text-slate-950 dark:text-white"
                    >
                      {generatedCommit.content}
                    </p>
                  </div>
                  <Button variant="secondary" onclick={copyGeneratedCommit}>Copy</Button>
                </div>
                {#if copyMessage}
                  <p class="mt-3 text-sm text-slate-600 dark:text-slate-400">{copyMessage}</p>
                {/if}
              </div>
            {/if}
            {#if generatedPR}
              <div
                class="border-brand-100 bg-brand-50/80 dark:border-brand-700 dark:bg-brand-900/30 mt-5 rounded-2xl border p-4"
              >
                <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p class="text-brand-700 text-xs font-bold uppercase tracking-[0.2em]">
                      {generatedPR.title}
                    </p>

                    <div class="mt-2 max-h-64 overflow-y-auto rounded-lg bg-white/60 p-3 dark:bg-slate-800/60">
                      <pre class="whitespace-pre-wrap break-words text-sm text-slate-900 dark:text-slate-200">
                    {generatedPR.content}
                        </pre>
                    </div>
                  </div>

                  <Button variant="secondary" onclick={copyGeneratedPR}>Copy</Button>
                </div>
              </div>
            {/if}
          </div>
        </div>

        <div class="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {#each navCards as card}
            <DashboardCard {...card} />
          {/each}
        </div>
      </section>
    </main>
  </div>
</div>
