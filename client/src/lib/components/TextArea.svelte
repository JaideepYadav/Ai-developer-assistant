<script lang="ts">
  interface Props {
    id: string;
    label: string;
    placeholder?: string;
    value?: string;
    rows?: number;
  }

  let { id, label, placeholder = '', value = $bindable(''), rows = 6 }: Props = $props();
</script>

<label class="block" for={id}>
  <span class="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">{label}</span>
  <textarea
    bind:value
    {id}
    {rows}
    {placeholder}
    class="focus:border-brand-500 focus:ring-brand-500 block w-full resize-y rounded-2xl border-slate-200 bg-white/90 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 dark:border-slate-600 dark:bg-slate-800/90 dark:text-slate-100 dark:placeholder:text-slate-500"
  ></textarea>
</label>
