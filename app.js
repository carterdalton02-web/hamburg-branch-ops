const DATA = {
  closing: [
    {
      owner: "Closing Lead",
      frequency: "Daily",
      tasks: [
        "Verify all TMs have signed off all computers.",
        "Set timer, shut, and lock SDB vault.",
        "Verify all teller workstation drawers containing cash and all desk drawers containing client or bank information are locked."
      ]
    },
    {
      owner: "Secondary Closing",
      frequency: "Daily",
      tasks: [
        "Balance the TCR.",
        "Verify all cashboxes are in the vault, set timer, shut and lock.",
        "Close office on ET and verify nothing is outstanding."
      ]
    },
    {
      owner: "Tertiary Closing",
      frequency: "Daily",
      tasks: [
        "Verify nothing is left on any printers, including the supply room.",
        "Verify all client or bank information is locked up.",
        "Verify all work has been put away."
      ]
    },
    {
      owner: "Final Closing",
      frequency: "Daily",
      tasks: [
        "Secure all shred and ensure the shred bin has been emptied.",
        "Turn off drive-through lights and ensure tubes are recalled and turned off.",
        "Place phones on night mode.",
        "Check voicemail in the morning.",
        "Check voicemail at night."
      ]
    }
  ],
  champion: [
    { owner: "Cash Advance", frequency: "Daily", tasks: ["Validate cash advance business day.", "Branch printed terminal detail report.", "Validate following cash advance procedure."] },
    { owner: "Keys & Combinations", frequency: "Daily", tasks: ["Review teammate assignment logs for accuracy.", "Verify completion including Saturday assignments if applicable."] },
    { owner: "Miscellaneous Storage", frequency: "Daily", tasks: ["Review MIS log for accuracy.", "Confirm items are not held past specified retention."] },
    { owner: "Information Security", frequency: "Daily", tasks: ["Ensure sensitive or negotiable items are secured overnight.", "Verify items delivered by USPS, FedEx, or UPS are secured."] },
    { owner: "Signature Cards", frequency: "Daily", tasks: ["Review new account signature cards.", "Confirm reports are uploaded/completed accurately."] },
    { owner: "Balance Sheet Review", frequency: "Daily", tasks: ["Review teller balance sheets.", "Document outages and required action plan items."] },
    { owner: "Proof Corrections", frequency: "Weekly", tasks: ["Ensure all proof corrections have been processed accurately and timely."] },
    { owner: "Safe Deposit Box", frequency: "Weekly", tasks: ["Review SDB reports.", "Verify control of keys and access documentation."] },
    { owner: "Branch Self-Identified Log", frequency: "Weekly", tasks: ["Review log for accuracy.", "Confirm action plan and date resolved fields are complete."] }
  ],
  brinks: [
    {
      owner: "Brinks Shipment",
      frequency: "As needed",
      tasks: [
        "Send urgent team notification: Brinks is here.",
        "Vault teller steps off line and escorts courier to vault room.",
        "Dual-control teammate becomes available and uninterrupted.",
        "Receive incoming shipment.",
        "Provide outgoing shipment if applicable.",
        "Verify shipment under dual control.",
        "Document completion and close workflow."
      ]
    }
  ],
  vault: [
    {
      owner: "Vault Custody",
      frequency: "Daily",
      tasks: [
        "Confirm vault custody status.",
        "Verify dual-control requirements are met when applicable.",
        "Confirm vault is balanced.",
        "Review shipment readiness.",
        "Document any discrepancy or unresolved issue."
      ]
    }
  ]
};

const state = JSON.parse(localStorage.getItem("hboms-state") || "{}");
state.checks ||= {};
state.audit ||= [];
state.assignments ||= {};

const screens = document.querySelectorAll(".screen");
const navButtons = document.querySelectorAll(".nav-btn");
const modal = document.getElementById("assignmentModal");

function key(area, owner, task) {
  return `${area}::${owner}::${task}`;
}

function save() {
  localStorage.setItem("hboms-state", JSON.stringify(state));
}

function nowStamp() {
  return new Date().toLocaleString();
}

function showAssignmentModal() {
  modal.classList.add("active");
  document.getElementById("closingAssign").value = state.assignments.closing || "";
  document.getElementById("championAssign").value = state.assignments.champion || "";
  document.getElementById("brinksAssign").value = state.assignments.brinks || "";
  document.getElementById("vaultAssign").value = state.assignments.vault || "";
}

function hideAssignmentModal() {
  modal.classList.remove("active");
}

function saveAssignments() {
  state.assignments.closing = document.getElementById("closingAssign").value.trim() || "Closing Lead";
  state.assignments.champion = document.getElementById("championAssign").value.trim() || "Operations Champion";
  state.assignments.brinks = document.getElementById("brinksAssign").value.trim() || "Brinks Coordinator";
  state.assignments.vault = document.getElementById("vaultAssign").value.trim() || "Vault Manager";
  save();
  hideAssignmentModal();
  renderAll();
}

function getAssignedName(area) {
  const roleMap = {
    closing: state.assignments.closing || "Closing Lead",
    champion: state.assignments.champion || "Operations Champion",
    brinks: state.assignments.brinks || "Brinks Coordinator",
    vault: state.assignments.vault || "Vault Manager"
  };
  return roleMap[area] || "Team Member";
}

function renderTaskArea(area, targetId) {
  const target = document.getElementById(targetId);
  target.innerHTML = "";
  
  const assignedName = getAssignedName(area);
  
  DATA[area].forEach(group => {
    const card = document.createElement("article");
    card.className = "task-card";
    card.innerHTML = `
      <header>
        <div>
          <h3>${assignedName}</h3>
          <span class="badge">${group.frequency}</span>
        </div>
      </header>
    `;

    group.tasks.forEach(task => {
      const id = key(area, group.owner, task);
      const row = document.createElement("label");
      row.className = "task-item";
      row.innerHTML = `
        <input type="checkbox" ${state.checks[id]?.done ? "checked" : ""} aria-label="${task}">
        <span>${task}<small>${state.checks[id]?.stamp || "Not completed"}</small></span>
      `;
      const input = row.querySelector("input");
      input.addEventListener("change", () => {
        state.checks[id] = {
          done: input.checked,
          stamp: input.checked ? nowStamp() : "Reset " + nowStamp()
        };
        state.audit.unshift({
          stamp: nowStamp(),
          area,
          task,
          owner: assignedName,
          status: input.checked ? "Completed" : "Reset"
        });
        save();
        renderAll();
      });
      card.appendChild(row);
    });

    const notes = document.createElement("div");
    notes.className = "notes";
    const notesId = `notes-${area}-${group.owner.replaceAll(" ", "-")}`;
    notes.innerHTML = `
      <label for="${notesId}">Notes</label>
      <textarea id="${notesId}" placeholder="Add notes, exception details, or follow-up items."></textarea>
    `;
    card.appendChild(notes);
    target.appendChild(card);
  });
}

function areaPercent(area) {
  const tasks = DATA[area].flatMap(g => g.tasks.map(t => key(area, g.owner, t)));
  const done = tasks.filter(id => state.checks[id]?.done).length;
  return tasks.length ? Math.round((done / tasks.length) * 100) : 0;
}

function renderMetrics() {
  const areas = ["closing", "champion", "brinks", "vault"];
  const total = Math.round(areas.reduce((sum, a) => sum + areaPercent(a), 0) / areas.length);
  document.getElementById("completionPercent").textContent = total + "%";

  areas.forEach(area => {
    const pct = areaPercent(area);
    document.getElementById(`${area}Metric`).textContent = pct + "%";
    document.getElementById(`${area}Progress`).value = pct;
  });

  const open = [];
  Object.entries(DATA).forEach(([area, groups]) => {
    groups.forEach(group => {
      group.tasks.forEach(task => {
        const id = key(area, group.owner, task);
        if (!state.checks[id]?.done) open.push(`${getAssignedName(area)}: ${task}`);
      });
    });
  });
  const list = document.getElementById("openItems");
  list.innerHTML = open.length ? open.slice(0, 10).map(item => `<li>${item}</li>`).join("") : "<li>All tracked items are complete.</li>";
}

function renderAudit() {
  const body = document.getElementById("auditTable");
  body.innerHTML = state.audit.length
    ? state.audit.map(a => `<tr><td>${a.stamp}</td><td>${a.area}</td><td>${a.task}</td><td>${a.owner}</td><td>${a.status}</td></tr>`).join("")
    : `<tr><td colspan="5">No activity yet.</td></tr>`;
}

function renderAll() {
  renderTaskArea("closing", "closingChecklist");
  renderTaskArea("champion", "championChecklist");
  renderTaskArea("brinks", "brinksChecklist");
  renderTaskArea("vault", "vaultChecklist");
  renderMetrics();
  renderAudit();
}

// Event Listeners
navButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    navButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    screens.forEach(screen => screen.classList.remove("active-screen"));
    document.getElementById(btn.dataset.screen).classList.add("active-screen");
    document.getElementById("main").focus();
  });
});

document.getElementById("todayLabel").textContent = new Date().toLocaleDateString(undefined, {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric"
});

document.getElementById("confirmAssignment").addEventListener("click", saveAssignments);

document.getElementById("changeTeamBtn").addEventListener("click", showAssignmentModal);

document.getElementById("resetBtn").addEventListener("click", () => {
  if (!confirm("Reset all demo checklist data?")) return;
  localStorage.removeItem("hboms-state");
  location.reload();
});

document.getElementById("exportBtn").addEventListener("click", () => {
  const rows = [["Date/Time", "Area", "Task", "Completed By", "Status"], ...state.audit.map(a => [a.stamp, a.area, a.task, a.owner, a.status])];
  const csv = rows.map(r => r.map(v => `"${String(v).replaceAll('"', '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "hamburg-branch-ops-audit-log.csv";
  a.click();
  URL.revokeObjectURL(url);
});

// Initialize
if (!state.assignments.closing) {
  showAssignmentModal();
} else {
  renderAll();
}