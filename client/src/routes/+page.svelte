<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import DashboardCard from '$lib/components/DashboardCard.svelte';
  import NavBar from '$lib/components/NavBar.svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import TextArea from '$lib/components/TextArea.svelte';
  import { generateCommit } from '$lib/services/api';
  import type { GenerationResult } from '$lib/types/generation';

  const cards = [
    {
      icon: 'CM',
      title: 'Generate Commit Message',
      description:
        'Convert staged changes or pasted diffs into clear conventional commit messages.',
      action: 'Create Commit'
    },
    {
      icon: 'PR',
      title: 'Generate PR',
      description:
        'Draft concise pull request titles and descriptions with summaries and testing notes.',
      action: 'Draft PR'
    },
    {
      icon: 'EX',
      title: 'Explain Code',
      description:
        'Turn complex snippets into practical explanations for maintainers and reviewers.',
      action: 'Explain Code'
    },
    {
      icon: 'RV',
      title: 'Review Code',
      description:
        'Surface mock review suggestions for correctness, maintainability, and missing tests.',
      action: 'Review Code'
    },
    {
      icon: 'HI',
      title: 'Recent History',
      description:
        'Track generated outputs and revisit previous commit, PR, review, and explanation drafts.',
      action: 'View History'
    }
  ];

  let codeContext = $state('');
  let isGeneratingCommit = $state(false);
  let generatedCommit = $state<GenerationResult | null>(null);
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
    } catch (error) {
      errorMessage = error instanceof Error ? error.message : 'Failed to generate commit message.';
    } finally {
      isGeneratingCommit = false;
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
</script>

<div
  class="min-h-screen bg-[radial-gradient(circle_at_top_left,#dbeafe,transparent_30%),linear-gradient(180deg,#f8fafc,#eef2ff)]"
>
  <NavBar />

  <div class="flex min-h-[calc(100vh-4rem)]">
    <Sidebar />

    <main class="flex-1 px-4 py-6 sm:px-6 lg:px-8">
      <section class="mx-auto max-w-7xl">
        <div class="grid gap-6 lg:grid-cols-[1.35fr_0.65fr] lg:items-stretch">
          <div class="shadow-card rounded-[2rem] bg-slate-950 p-8 text-white">
            <p class="text-brand-100 text-sm font-semibold uppercase tracking-[0.24em]">
              Production scaffold
            </p>
            <h1 class="mt-4 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
              Generate cleaner commits, PRs, reviews, and explanations.
            </h1>
            <p class="mt-5 max-w-2xl text-base leading-7 text-slate-300">
              A modern developer dashboard foundation ready for future OpenCode-powered generation
              workflows.
            </p>
            <div class="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button>Start Generating</Button>
              <Button
                variant="ghost"
                class="bg-white/10 text-white hover:bg-white/15 hover:text-white">View Docs</Button
              >
            </div>
          </div>

          <div
            class="shadow-card rounded-[2rem] border border-slate-200 bg-white/85 p-6 backdrop-blur"
          >
            <h2 class="text-lg font-bold text-slate-950">Quick Context</h2>
            <p class="mt-2 text-sm leading-6 text-slate-600">
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
              <Button onclick={handleGenerateCommit} disabled={isGeneratingCommit}>
                {isGeneratingCommit ? 'Generating...' : 'Generate Commit'}
              </Button>
              {#if errorMessage}
                <p class="text-sm font-medium text-red-600">{errorMessage}</p>
              {/if}
            </div>

            {#if generatedCommit}
              <div class="border-brand-100 bg-brand-50/80 mt-5 rounded-2xl border p-4">
                <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p class="text-brand-700 text-xs font-bold uppercase tracking-[0.2em]">
                      {generatedCommit.title}
                    </p>
                    <p class="mt-2 break-words font-mono text-sm font-semibold text-slate-950">
                      {generatedCommit.content}
                    </p>
                  </div>
                  <Button variant="secondary" onclick={copyGeneratedCommit}>Copy</Button>
                </div>
                {#if copyMessage}
                  <p class="mt-3 text-sm text-slate-600">{copyMessage}</p>
                {/if}
              </div>
            {/if}
          </div>
        </div>

        <div class="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
          {#each cards as card}
            <DashboardCard {...card} />
          {/each}
        </div>
      </section>
    </main>
  </div>
</div>
