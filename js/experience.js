/* js/experience.js
   Multi-experience timeline with expandable month-wise details.
   Add new experience objects inside `experiences` array.
*/

/* ---------- DATA: ADD MORE EXPERIENCES HERE ---------- */
const experiences = [

  {
    id: "exp-tgsrtc",
    title: "Graduate Apprentice",
    org: "TGSRTC",
    duration: "2024 — Present",
    short: "Graduate Apprentice ",
    tags: ["SQL","Streamlit","Python"],
    months: [
      { date: "2024 Sep - Nov", text: "Undergone training to understand key terminologies, operational workflows, and the structure of operational data stored in the TGSRTC CIS." },
      { date: "2025 Jan", text: "Analyzed key operational metrics—daily driver operations, leave and absentee data, and health grade assessments using Excel tools such as Pivot Tables, Lookups, and conditional formatting to support reporting and operational planning." },
      { date: "2025 Feb", text: "Designed and implemented a Google Sheets–based operational tracking tool to capture critical data points such as driver allocation, driver requirement for planned services, and health-based availability. The tool was rolled out to 4 depots during Phase-I, enabling standardized data entry and operational visibility across locations." },
      { date: "2025 Mar - May", text: "Defined and implemented crucial KPIs for analyzing depot productivity and operational performance, following strategic discussions with senior TGSRTC officers. Scaled the operational tool in a structured manner by integrating 11 more depots under Phase-II and 33 depots under Phase-III, ensuring consistency and wider adoption across the organization." },
      { date: "2025 Jun - Jul", text: "Upgraded the system from a Google Sheet-based workflow to a dynamic Python Streamlit dashboard, incorporating UI/UX changes and process adjustments suggested by depot managers. Deployed the dashboard for multi-depot access, with data integrated into a backend database to enable structured storage, seamless updates, and improved analysis capabilities. For more Details go to projects page." },
      { date: "2025 Aug - Present", text: "Executed Phase-IV by onboarding the last set of depots onto the system, ensuring full organizational adoption. Concurrently developed two analytics modules—a Driver Productivity Dashboard and a Depot Productivity Dashboard—using Streamlit and database-driven models to support advanced operational analysis." }
    ]
  }
];

/* ---------- ELEMENTS ---------- */
const timeline = document.getElementById("timeline");


/* ---------- CARD CREATION ---------- */
function createMainCard(exp, index = 0){
  const wrapper = document.createElement("div");
  const sideClass = (index % 2 === 0) ? "left" : "right";
  wrapper.className = `timeline-item ${sideClass} fade-up`;
  wrapper.dataset.id = exp.id;
  wrapper.tabIndex = 0;

  const dot = document.createElement("div");
  dot.className = "timeline-dot";
  dot.style.top = "20px";

  const date = document.createElement("div");
  date.className = "date";
  date.textContent = exp.duration;

  const title = document.createElement("h3");
  title.textContent = exp.title;

  const meta = document.createElement("div");
  meta.className = "meta";
  meta.textContent = exp.org;

  const short = document.createElement("p");
  short.textContent = exp.short;

  const arrow = document.createElement("div");
  arrow.className = "item-arrow";
  arrow.innerHTML = "►";

  wrapper.appendChild(date);
  wrapper.appendChild(title);
  wrapper.appendChild(meta);
  wrapper.appendChild(short);
  wrapper.appendChild(arrow);
  wrapper.appendChild(dot);

  wrapper.addEventListener("click", () => toggleExpand(wrapper));
  wrapper.addEventListener("keypress", e => {
    if(e.key === "Enter" || e.key === " ") toggleExpand(wrapper);
  });

  return wrapper;
}


/* ---------- EXPANDED BLOCK ---------- */
function createExpandedBlock(exp, indexSide = 0){
  const block = document.createElement("div");
  block.className = "expanded-block fade-up";
  block.classList.add(indexSide % 2 === 0 ? "expanded-left" : "expanded-right");

  exp.months.forEach(m => {
    const me = document.createElement("div");
    me.className = "month-entry";

    const md = document.createElement("div");
    md.className = "mdate";
    md.textContent = m.date;

    const desc = document.createElement("div");
    desc.className = "mdesc";
    desc.textContent = m.text;

    me.appendChild(md);
    me.appendChild(desc);
    block.appendChild(me);
  });

  return block;
}


/* ---------- TOGGLE EXPANSION ---------- */
let expandedBlockNode = null;

function toggleExpand(cardEl){
  const alreadyOpen = cardEl.classList.contains("open");

  closeExpanded();

  if(!alreadyOpen){
    cardEl.classList.add("open");

    const expId = cardEl.dataset.id;
    const exp = experiences.find(e => e.id === expId);

    const indexSide = cardEl.classList.contains("left") ? 0 : 1;
    expandedBlockNode = createExpandedBlock(exp, indexSide);

    if(cardEl.nextSibling){
      timeline.insertBefore(expandedBlockNode, cardEl.nextSibling);
    } else {
      timeline.appendChild(expandedBlockNode);
    }

    requestAnimationFrame(() => {
      expandedBlockNode.classList.add("show");
    });
  }
}


/* ---------- FIXED CLOSE FUNCTION ---------- */
function closeExpanded(){
  const openCard = document.querySelector(".timeline-item.open");
  if(openCard) openCard.classList.remove("open");

  if(expandedBlockNode){
    expandedBlockNode.remove();  // instant remove
    expandedBlockNode = null;

    // force reflow to collapse gap instantly
    void timeline.offsetHeight;
  }
}


/* ---------- RENDER EXPERIENCES ---------- */
function renderAllExperiences(){
  timeline.innerHTML = "";

  experiences.forEach((exp, index) => {
    const card = createMainCard(exp, index);
    timeline.appendChild(card);
  });

  initObserver();
}

renderAllExperiences();


/* ---------- CLICK OUTSIDE TO CLOSE ---------- */
document.addEventListener("click", e => {
  if(!e.composedPath().includes(timeline)){
    closeExpanded();
  }
});


/* ---------- SCROLL FADE ANIMATION ---------- */
function initObserver(){
  const els = document.querySelectorAll(".fade-up");
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.18 });

  els.forEach(e => obs.observe(e));
}
