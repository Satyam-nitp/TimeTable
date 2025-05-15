 const data = [
      ["2025-05-12 (Monday)", "Analog", "EDC", "WebD", "DSA", "Digital", "Maths"],
      ["2025-05-13 (Tuesday)", "Analog", "EDC", "WebD", "DSA", "Digital", "Maths"],
      ["2025-05-14 (Wednesday)", "Analog", "EDC", "WebD", "DSA", "Digital", "Maths"],
      ["2025-05-15 (Thursday)", "Analog", "EDC", "WebD", "DSA", "Digital", "Maths"],
      ["2025-05-16 (Friday)", "Analog", "EDC", "WEBD", "DSA", "Digital", "Maths"],
      ["2025-05-17 (Saturday)", "Analog", "EDC", "WEBD", "DSA", "Digital", "Maths"],
      ["2025-05-18 (Sunday)", "Revision", "Revision", "Revision", "Revision", "Revision", "Revision"],
      ["2025-05-19 (Monday)", "Analog", "EDC", "WEBD", "DSA", "Digital", "Maths"],
      ["2025-05-20 (Tuesday)", "Analog", "EDC", "WEBD", "DSA", "Digital", "Maths"],
      ["2025-05-21 (Wednesday)", "Analog", "EDC", "WEBD", "DSA", "Digital", "Maths"],
      ["2025-05-22 (Thursday)", "Analog", "EDC", "WEBD", "DSA", "Digital", "Maths"],
      ["2025-05-23 (Friday)", "Analog", "EDC", "WEBD", "DSA", "Digital", "Maths"],
      ["2025-05-24 (Saturday)", "Analog", "EDC", "WEBD", "DSA", "Digital", "Maths"],
      ["2025-05-25 (Sunday)", "Revision", "Revision", "Revision", "Revision", "Revision", "Revision"],
      ["2025-05-26 (Monday)", "Analog", "EDC", "WEBD", "DSA", "Digital", "Maths"],
      ["2025-05-27 (Tuesday)", "Analog", "EDC", "WEBD", "DSA", "Digital", "Maths"],
      ["2025-05-28 (Wednesday)", "Analog", "EDC", "WEBD", "DSA", "Digital", "Maths"],
      ["2025-05-29 (Thursday)", "Analog", "EDC", "WEBD", "DSA", "Digital", "Maths"],
      ["2025-05-30 (Friday)", "Analog", "EDC", "WEBD", "DSA", "Digital", "Maths"],
      ["2025-05-31 (Saturday)", "Analog", "EDC", "WEBD", "DSA", "Digital", "Maths"],
      ["2025-06-01 (Sunday)", "Revision", "Revision", "Revision", "Revision", "Revision", "Revision"],
      ["2025-06-02 (Monday)", "Analog", "EDC", "WEBD", "DSA", "Digital", "Maths"],
      ["2025-06-03 (Tuesday)", "Analog", "EDC", "WEBD", "DSA", "Digital", "Maths"],
      ["2025-06-04 (Wednesday)", "Analog", "EDC", "WEBD", "DSA", "Digital", "Maths"],
      ["2025-06-05 (Thursday)", "Analog", "EDC", "WEBD", "DSA", "Digital", "Maths"],
      ["2025-06-06 (Friday)", "Analog", "EDC", "WEBD", "DSA", "Digital", "Maths"],
      ["2025-06-07 (Saturday)", "Analog", "EDC", "WEBD", "DSA", "Digital", "Maths"],
      ["2025-06-08 (Sunday)", "Revision", "Revision", "Revision", "Revision", "Revision", "Revision"],
      ["2025-06-09 (Monday)", "Analog", "EDC", "WEBD", "DSA", "Digital", "Maths"],
      ["2025-06-10 (Tuesday)", "Analog", "EDC", "WEBD", "DSA", "Digital", "Maths"],
      ["2025-06-11 (Wednesday)", "Analog", "EDC", "WEBD", "DSA", "Digital", "Maths"],
      ["2025-06-12 (Thursday)", "Analog", "EDC", "WEBD", "DSA", "Digital", "Maths"],
      ["2025-06-13 (Friday)", "Analog", "EDC", "WEBD", "DSA", "Digital", "Maths"],
      ["2025-06-14 (Saturday)", "Analog", "EDC", "WEBD", "DSA", "Digital", "Maths"],
      ["2025-06-15 (Sunday)", "Revision", "Revision", "Revision", "Revision", "Revision", "Revision"]
    ];


const tbody = document.querySelector("#timetable tbody");
const totalSessions = 6;

function renderTable(filter = "") {
  tbody.innerHTML = "";
  const todayStr = new Date().toISOString().slice(0, 10);
  let weekCount = 0;

  data.forEach((row, rowIndex) => {
    const dateStr = row[0];
    const dateOnly = dateStr.split(" ")[0];
    const dayName = dateStr.split("(")[1].replace(")", "").toLowerCase();

    if (filter && !dateStr.toLowerCase().includes(filter.toLowerCase())) return;

    const tr = document.createElement("tr");

    if (dayName === "sunday") {
      tr.classList.add("sunday");
      const td = document.createElement("td");
      td.colSpan = 8;
      td.innerText = `${dateStr} — Revision Day`;
      tr.appendChild(td);
      tbody.appendChild(tr);
      return;
    }

    if (dayName === "monday") weekCount++;
    tr.classList.add(`week${weekCount}`);

    if (dateOnly === todayStr) tr.classList.add("today");

    // Date cell
    const dateCell = document.createElement("td");
    dateCell.textContent = dateStr;
    tr.appendChild(dateCell);

    // Sessions cells (6)
    for (let i = 1; i <= totalSessions; i++) {
      const sessionCell = document.createElement("td");
      sessionCell.innerHTML = row[i];

      // Enable drag & drop on sessions
      sessionCell.setAttribute("draggable", "true");
      sessionCell.dataset.row = rowIndex;
      sessionCell.dataset.col = i;

      // Create toggle button for session done/not done
      const btn = document.createElement("button");
      btn.className = "toggle-btn";
      btn.innerText = "❌ Not Done";

      btn.onclick = () => {
        btn.classList.toggle("done");
        btn.innerText = btn.classList.contains("done") ? "✅ Done" : "❌ Not Done";
        updateStatus(tr);
      };

      const div = document.createElement("div");
      div.className = "status-toggle";
      div.appendChild(btn);
      sessionCell.appendChild(div);

      tr.appendChild(sessionCell);
    }

    // Status cell
    const status = document.createElement("td");
    status.classList.add("overall-status");
    status.innerText = `0/${totalSessions} Completed`;
    tr.appendChild(status);

    tbody.appendChild(tr);
  });

  addDragAndDropListeners();
}

function updateStatus(tr) {
  const doneCount = tr.querySelectorAll(".toggle-btn.done").length;
  tr.querySelector(".overall-status").innerText = `${doneCount}/${totalSessions} Completed`;
  renderWeeklyAnalysis(); // <- add this line
}

// Dark mode toggle
function toggleDarkMode() {
  document.body.classList.toggle("light-mode");
  localStorage.setItem("lightMode", document.body.classList.contains("light-mode"));
}

// Search filter
document.getElementById("searchInput").addEventListener("input", e => {
  renderTable(e.target.value);
});

// Export to CSV
function exportToCSV() {
  let csvContent = "data:text/csv;charset=utf-8,";

  // Headers
  csvContent += [
    "Date (Day)",
    "07:00AM-10:20AM",
    "10:30AM-01:20PM",
    "02:15PM-04:40PM",
    "04:45PM-07:10PM",
    "07:15PM-08:45PM",
    "09:00PM-10:30PM",
    "Completed Sessions"
  ].join(",") + "\r\n";

  // Data rows
  tbody.querySelectorAll("tr").forEach(tr => {
    if (tr.classList.contains("sunday")) {
      const tdText = tr.querySelector("td").innerText;
      csvContent += `"${tdText}",,,,,,,\r\n`;
    } else {
      const cells = tr.querySelectorAll("td");
      const rowData = [];
      for (let i = 0; i < cells.length - 1; i++) {
        if (i === 0) {
          rowData.push(`"${cells[i].innerText}"`);
        } else {
          // Exclude toggle buttons text, get only session names:
          rowData.push(`"${cells[i].childNodes[0]?.textContent.trim() || cells[i].innerText}"`);
        }
      }
      rowData.push(`"${cells[cells.length - 1].innerText}"`);
      csvContent += rowData.join(",") + "\r\n";
    }
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "study_timetable.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Drag & Drop
let draggedCell = null;

function addDragAndDropListeners() {
  const sessionCells = tbody.querySelectorAll("td[draggable='true']");

  sessionCells.forEach(cell => {
    cell.addEventListener("dragstart", e => {
      draggedCell = cell;
      cell.classList.add("dragging");
      e.dataTransfer.effectAllowed = "move";
    });

    cell.addEventListener("dragend", () => {
      draggedCell.classList.remove("dragging");
      draggedCell = null;
    });

    cell.addEventListener("dragover", e => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
    });

    cell.addEventListener("drop", e => {
      e.preventDefault();
      if (!draggedCell || draggedCell === cell) return;

      // Swap text content and button states of the two session cells
      const draggedText = draggedCell.childNodes[0].textContent;
      const cellText = cell.childNodes[0].textContent;

      // Swap main text (session name)
      draggedCell.childNodes[0].textContent = cellText;
      cell.childNodes[0].textContent = draggedText;

      // Swap toggle buttons states
      const draggedBtn = draggedCell.querySelector(".toggle-btn");
      const cellBtn = cell.querySelector(".toggle-btn");

      const draggedDone = draggedBtn.classList.contains("done");
      const cellDone = cellBtn.classList.contains("done");

      if (draggedDone !== cellDone) {
        draggedBtn.classList.toggle("done");
        draggedBtn.innerText = draggedBtn.classList.contains("done") ? "✅ Done" : "❌ Not Done";

        cellBtn.classList.toggle("done");
        cellBtn.innerText = cellBtn.classList.contains("done") ? "✅ Done" : "❌ Not Done";
      }

      // Update status of both rows
      updateStatus(draggedCell.parentElement);
      updateStatus(cell.parentElement);
    });
  });
}

// Load theme from localStorage
if (localStorage.getItem("lightMode") === "true") {
  document.body.classList.add("light-mode");
}

document.getElementById("toggleThemeBtn").addEventListener("click", toggleDarkMode);
document.getElementById("exportBtn").addEventListener("click", exportToCSV);


function renderWeeklyAnalysis() {
  const analysisDiv = document.getElementById("weeklyAnalysis");
  analysisDiv.innerHTML = "<h3>📊 Weekly Completion Analysis</h3>";

  const weekData = {};

  tbody.querySelectorAll("tr").forEach(tr => {
    const classList = [...tr.classList];
    const weekClass = classList.find(cls => cls.startsWith("week"));
    if (!weekClass) return;

    if (!weekData[weekClass]) {
      weekData[weekClass] = { total: 0, done: 0 };
    }

    const doneCount = tr.querySelectorAll(".toggle-btn.done").length;
    weekData[weekClass].total += totalSessions;
    weekData[weekClass].done += doneCount;
  });

  Object.entries(weekData).forEach(([week, { total, done }]) => {
    const percent = total > 0 ? ((done / total) * 100).toFixed(1) : "0.0";
    const div = document.createElement("div");
    div.className = "week-summary";
    div.innerText = `🗓 ${week.toUpperCase()}: ${done}/${total} sessions completed (${percent}%)`;
    analysisDiv.appendChild(div);
  });
}

renderTable();
renderWeeklyAnalysis();
