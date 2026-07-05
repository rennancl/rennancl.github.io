import { parseCSV, formatCSVAligned } from './formater-csv.js';

const input = document.getElementById('formater-input');
const errorEl = document.getElementById('formater-error');
const outputEl = document.getElementById('formater-output');
const tabsEl = document.getElementById('formater-tabs');
const tabTable = document.getElementById('tab-table');
const tabAligned = document.getElementById('tab-aligned');
const copyButton = document.getElementById('formater-copy');
const jsonEl = document.getElementById('formater-json');
const jsonCode = document.getElementById('formater-json-code');
const tableView = document.getElementById('formater-table-view');
const alignedView = document.getElementById('formater-aligned-view');

let mode = null; // 'json' | 'csv' | null
let activeCsvTab = 'table';
let alignedText = '';

function clearOutput() {
  errorEl.hidden = true;
  outputEl.hidden = true;
  tabsEl.hidden = true;
  jsonEl.hidden = true;
  tableView.hidden = true;
  alignedView.hidden = true;
  mode = null;
}

function showError(message) {
  clearOutput();
  errorEl.textContent = message;
  errorEl.hidden = false;
}

function renderTable(rows) {
  const colCount = Math.max(...rows.map((r) => r.length));
  const table = document.createElement('table');

  if (rows.length > 1) {
    const thead = document.createElement('thead');
    const headRow = document.createElement('tr');
    for (let c = 0; c < colCount; c++) {
      const th = document.createElement('th');
      th.textContent = rows[0][c] ?? '';
      headRow.appendChild(th);
    }
    thead.appendChild(headRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    for (let r = 1; r < rows.length; r++) {
      const tr = document.createElement('tr');
      for (let c = 0; c < colCount; c++) {
        const td = document.createElement('td');
        td.textContent = rows[r][c] ?? '';
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
  } else {
    const tbody = document.createElement('tbody');
    const tr = document.createElement('tr');
    for (let c = 0; c < colCount; c++) {
      const td = document.createElement('td');
      td.textContent = rows[0][c] ?? '';
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
    table.appendChild(tbody);
  }

  tableView.replaceChildren(table);
}

function showCsvTab(tabName) {
  activeCsvTab = tabName;
  tabTable.setAttribute('aria-pressed', String(tabName === 'table'));
  tabAligned.setAttribute('aria-pressed', String(tabName === 'aligned'));
  tableView.hidden = tabName !== 'table';
  alignedView.hidden = tabName !== 'aligned';
}

function renderCsv(rows) {
  mode = 'csv';
  outputEl.hidden = false;
  tabsEl.hidden = false;
  jsonEl.hidden = true;
  renderTable(rows);
  alignedText = formatCSVAligned(rows);
  alignedView.textContent = alignedText;
  showCsvTab(activeCsvTab);
}

function renderJson(value) {
  mode = 'json';
  outputEl.hidden = false;
  tabsEl.hidden = true;
  tableView.hidden = true;
  alignedView.hidden = true;
  jsonEl.hidden = false;
  jsonCode.textContent = JSON.stringify(value, null, 2);
}

function isCsvLike(rows) {
  return rows.length > 0 && rows.some((row) => row.some((cell) => cell !== ''));
}

function tableToTsv() {
  const rows = Array.from(tableView.querySelectorAll('tr')).map((tr) =>
    Array.from(tr.children)
      .map((cell) => cell.textContent)
      .join('\t')
  );
  return rows.join('\n');
}

function process() {
  const text = input.value.trim();

  if (text === '') {
    clearOutput();
    return;
  }

  try {
    const value = JSON.parse(text);
    renderJson(value);
    return;
  } catch {
    // not JSON, try CSV next
  }

  const rows = parseCSV(input.value);
  if (isCsvLike(rows)) {
    renderCsv(rows);
    return;
  }

  showError("Couldn't recognize this as JSON or CSV.");
}

let debounceTimer;
input.addEventListener('input', () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(process, 200);
});

tabTable.addEventListener('click', () => showCsvTab('table'));
tabAligned.addEventListener('click', () => showCsvTab('aligned'));

copyButton.addEventListener('click', () => {
  let text = '';
  if (mode === 'json') {
    text = jsonCode.textContent;
  } else if (mode === 'csv') {
    text = activeCsvTab === 'aligned' ? alignedText : tableToTsv();
  }
  if (text) navigator.clipboard.writeText(text);
});
