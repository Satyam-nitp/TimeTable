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

      function getStatusKey(rowIndex, sessionIndex) {
        return `status_${rowIndex}_${sessionIndex}`;
      }

      function saveStatus(rowIndex, sessionIndex, isDone) {
        localStorage.setItem(getStatusKey(rowIndex, sessionIndex), isDone);
      }

      function getStatus(rowIndex, sessionIndex) {
        return localStorage.getItem(getStatusKey(rowIndex, sessionIndex)) === "true";
      }

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

          const dateCell = document.createElement("td");
          dateCell.textContent = dateStr;
          tr.appendChild(dateCell);

          for (let i = 1; i <= totalSessions; i++) {
            const sessionCell = document.createElement("td");
            sessionCell.innerHTML = row[i];
            sessionCell.setAttribute("draggable", "true");
            sessionCell.dataset.row = rowIndex;
            sessionCell.dataset.col = i;

            const btn = document.createElement("button");
            btn.className = "toggle-btn";

            const isDone = getStatus(rowIndex, i);
            if (isDone) {
              btn.classList.add("done");
              btn.innerText = "✅ Done";
            } else {
              btn.innerText = "❌ Not Done";
            }

            btn.onclick = () => {
              btn.classList.toggle("done");
              const done = btn.classList.contains("done");
              btn.innerText = done ? "✅ Done" : "❌ Not Done";
              saveStatus(rowIndex, i, done);
              updateStatus(tr);
            };

            const div = document.createElement("div");
            div.className = "status-toggle";
            div.appendChild(btn);
            sessionCell.appendChild(div);
            tr.appendChild(sessionCell);
          }

          const status = document.createElement("td");
          status.classList.add("overall-status");
          status.innerText = `0/${totalSessions} Completed`;
          tr.appendChild(status);

          tbody.appendChild(tr);
        });

        addDragAndDropListeners();
        updateAllStatus();
      }

      function updateStatus(tr) {
        const doneCount = tr.querySelectorAll(".toggle-btn.done").length;
        tr.querySelector(".overall-status").innerText = `${doneCount}/${totalSessions} Completed`;
        renderWeeklyAnalysis();
      }

      function updateAllStatus() {
        tbody.querySelectorAll("tr").forEach(tr => {
          updateStatus(tr);
        });
      }

      function toggleDarkMode() {
        document.body.classList.toggle("light-mode");
        localStorage.setItem("lightMode", document.body.classList.contains("light-mode"));
      }

      document.getElementById("searchInput").addEventListener("input", e => {
        renderTable(e.target.value);
      });

      document.getElementById("toggleThemeBtn").addEventListener("click", toggleDarkMode);

      if (localStorage.getItem("lightMode") === "true") {
        document.body.classList.add("light-mode");
      }

      function renderWeeklyAnalysis() {
        const analysisDiv = document.getElementById("weeklyAnalysis");
        analysisDiv.innerHTML = "<h3>📊 Weekly Completion Analysis</h3>";
        const weekData = {};

        tbody.querySelectorAll("tr").forEach(tr => {
          const weekClass = [...tr.classList].find(cls => cls.startsWith("week"));
          if (!weekClass) return;

          if (!weekData[weekClass]) weekData[weekClass] = { total: 0, done: 0 };
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