const objects = [
  ["Pet Figurine", "宠物小摆件", ["Wood Carving", "Blue-and-White Porcelain"], "桌面展示、生日礼物、纪念收藏", "把体型、姿势和表情做成一个可以放在身边的小物。"],
  ["Memorial Plaque", "纪念牌 / 名字牌", ["Wood Carving", "Mother-of-Pearl Inlay", "Blue-and-White Porcelain"], "名字、日期、轮廓与故事", "适合刻名字、日期、宠物轮廓和一句短短的纪念语。"],
  ["Pendant / Keychain", "挂件 / 钥匙扣", ["Wood Carving", "Mother-of-Pearl Inlay"], "随身携带、轻礼物", "小尺寸、轻量、适合螺钿光泽或木质温度。"],
  ["Jewelry Box / Memory Box", "首饰盒 / 纪念盒", ["Mother-of-Pearl Inlay", "Wood Carving"], "收藏毛发、小照片、小物", "更像一个温柔的收纳仪式，适合送礼和长期保存。"],
  ["Blue-and-White Porcelain Tile", "青花瓷盘 / 瓷片", ["Blue-and-White Porcelain"], "展示型纪念物", "适合做成清雅的宠物肖像、瓷片或小盘。"],
  ["Desk Ornament", "桌面摆件", ["Wood Carving", "Blue-and-White Porcelain"], "办公桌、玄关、书架", "比普通周边更克制，像一件小型手作陈设。"],
  ["Custom Object", "特殊物件", ["Not Sure"], "不确定时先询问", "交给品牌方判断是否适合手工艺和师傅档期。"]
];

const crafts = [
  {
    key: "wood",
    name: "Wood Carving",
    zh: "木雕",
    intro: "温润、自然、有收藏感，适合宠物小雕像、纪念牌、名字牌、木质挂件和桌面摆件。",
    options: ["5 cm Mini", "10 cm Standard", "15 cm Large", "20 cm+ Custom", "Cherry-like Wood", "Walnut-like Wood", "Stylized Figure", "High Detail Artisan Custom"],
    color: "木"
  },
  {
    key: "inlay",
    name: "Mother-of-Pearl Inlay",
    zh: "螺钿",
    intro: "有贝壳光泽和东方手作气质，适合名字牌、纪念牌、首饰盒、挂件和装饰板。",
    options: ["Small Pendant", "Name Plate", "Jewelry Box", "Blue-Green Shine", "Pink-Purple Shine", "Pet Silhouette", "Floral / Cloud Pattern"],
    color: "贝"
  },
  {
    key: "porcelain",
    name: "Blue-and-White Porcelain",
    zh: "青花瓷",
    intro: "清雅、有展示感，适合瓷盘、瓷片、小瓷像、香插、小花瓶和桌面陈设。",
    options: ["Ceramic Pet Tile", "Blue-and-White Plate", "Small Figurine", "Simple Portrait", "Cloud / Wave Pattern", "Deep Cobalt Blue", "Blue + Small Gold Detail"],
    color: "瓷"
  }
];

const stories = [
  ["case-wood-cat", "木雕圆脸猫小摆件", "Wood Carving · Cat", "从三张表情照片里提炼出圆脸、短腿和歪头姿势。"],
  ["case-inlay-nameplate", "螺钿名字牌", "Mother-of-Pearl · Dog", "用蓝绿色贝壳光泽做宠物轮廓和名字，适合礼盒。"],
  ["case-porcelain-plate", "青花瓷宠物盘", "Porcelain · Before / After", "把宠物侧脸和云水纹结合，做成展示型纪念物。"]
];

const faqs = [
  ["定制周期多久？", "不同工艺和复杂度差异较大，第一版只做询价。最终周期由品牌方与师傅确认后回复。"],
  ["为什么不直接显示最终价格？", "复杂定制会受尺寸、材料、师傅档期和细节复杂度影响，所以 demo 只显示 Estimated Add-ons。"],
  ["手工差异算质量问题吗？", "木纹、贝壳光泽、釉色流动等自然差异会提前说明，不等同于质量问题。"],
  ["照片会被公开展示吗？", "默认不公开。用于 Stories 或 Reels 必须由用户主动勾选授权。"],
  ["运输损坏怎么办？", "运输损坏由品牌方处理，可补发、维修、重做或退款，具体按政策页面执行。"]
];

const routeIds = ["home", "gallery", "crafts", "custom", "stories", "about", "contact", "faq", "admin"];
const briefKey = "handcraftBriefDemoV02";
const submissionsKey = "handcraftBriefSubmissionsV02";
const brief = JSON.parse(localStorage.getItem(briefKey) || "{}");
let currentStep = Number(brief.currentStep || 0);

const wizardSteps = [
  { label: "Pet Type", title: "选择宠物类型", help: "猫狗进入完整定制向导；其他动物使用简化联系。", render: () => options("petType", [["Cat", "猫咪完整流程"], ["Dog", "狗狗完整流程"], ["Other Animal", "进入简化联系"]]) },
  { label: "Basic Info", title: "基础信息", help: "名字和日常称呼会让 Brief 更像一份真正的制作文件。", render: () => fields([["petName", "Pet Name", "Mochi"], ["nickname", "Nickname", "糯米"], ["gender", "Gender", "Female"], ["age", "Age", "3"], ["petStatus", "Is the pet still with you?", "Still with me / Passed away"], ["calling", "How do you usually call them?", "小糯、糯米球"]]) },
  { label: "Breed & Hair", title: "品种、毛发和体型", help: "猫狗选项会略有不同，也可以选择 Not Sure。", render: breedHair },
  { label: "Body Shape", title: "体型和最明显身体特征", help: "比如短腿、圆脸、大尾巴、大头小身子。", render: () => options("bodyShape", ["Tiny", "Round", "Chubby", "Slim", "Strong", "Big and Fluffy", "Short-legged", "Long-bodied", "Big Head Small Body", "Round Face", "Big Belly", "Big Fluffy Tail"].map(x => [x, ""])) + fields([["weight", "Weight / Size note", "比如：4.8kg，坐下像一颗球"]]) },
  { label: "Color & Markings", title: "毛色与辨识花纹", help: "师傅需要知道最不能丢的特征。", render: () => options("colorMarkings", ["White", "Black", "Gray", "Golden", "Cream", "Orange", "Brown", "Silver", "Calico", "Tabby", "Tuxedo", "Tail Rings", "M Marking", "White Paws", "White Chest"].map(x => [x, ""])) + fields([["markingNote", "Supplement notes", "例如：左前爪是白色，尾巴尖黑色。"]]) },
  { label: "Face & Expression", title: "眼睛和经典表情", help: "宠物最像自己的地方，往往在表情。", render: () => options("expression", ["Green Eyes", "Amber Eyes", "Blue Eyes", "Silly", "Cheeky", "Judging", "Grumpy", "Happy", "Sleepy", "Proud", "Curious", "Bossy"].map(x => [x, ""])) + fields([["faceNote", "Face details", "例如：经常斜眼看人，像在审判。"]]) },
  { label: "Personality & Pose", title: "性格和姿势", help: "温柔、骄傲、爱趴着、喜欢抱玩具，都可以成为制作方向。", render: () => options("pose", ["Sitting", "Curled Up", "Looking Up", "Sleeping", "Standing", "With Toy", "Special Pose", "Not Sure"].map(x => [x, ""])) + fields([["personality", "Personality tags", "粘人、慢热、骄傲、像小老板"]]) },
  { label: "Photo Upload", title: "上传参考照片", help: "Demo 只预览文件名；正式版会上传到对象存储。", render: photoUpload },
  { label: "Object Type", title: "选择想做成的物件", help: "可以先选 Not Sure，让品牌方推荐。", render: () => options("objectType", ["Pet Figurine", "Memorial Plaque", "Pendant", "Keychain", "Jewelry Box", "Memory Box", "Blue-and-White Plate", "Ceramic Tile", "Desk Ornament", "Car Charm", "Custom Object", "Not Sure"].map(x => [x, ""])) },
  { label: "Craft Direction", title: "选择工艺方向", help: "不知道也可以选择 Not Sure。", render: () => options("craftDirection", [["Wood Carving", "温暖木质感"], ["Mother-of-Pearl Inlay", "贝壳光泽和精致线稿"], ["Blue-and-White Porcelain", "清雅瓷蓝和展示感"], ["Not Sure", "希望推荐"]]) },
  { label: "Craft Configuration", title: "工艺配置和预估加价", help: "根据上一步选择动态展示。最终报价仍然 To be confirmed。", render: craftConfig },
  { label: "Review", title: "Your Custom Craft Brief", help: "不要叫 Summary；这是一份提交给手作团队的正式简报。", render: reviewBrief },
  { label: "Success", title: "We received your Custom Craft Brief.", help: "Demo 提交后会进入 Admin Demo。", render: successPanel }
];

function saveBrief() {
  brief.currentStep = currentStep;
  localStorage.setItem(briefKey, JSON.stringify(brief));
}

function getValue(key, fallback = "") {
  return brief[key] || fallback;
}

function setValue(key, value) {
  brief[key] = value;
  saveBrief();
}

function options(key, rows) {
  return `<div class="option-grid">${rows.map(([name, desc]) => `
    <label class="option-card">
      <input type="radio" name="${key}" value="${name}" ${getValue(key) === name ? "checked" : ""}>
      <strong>${name}</strong><small>${desc || "Option card · Supplement below if needed"}</small>
    </label>`).join("")}</div>
    <label class="field full"><span>Supplement</span><textarea data-key="${key}Note" placeholder="Not sure? Tell us what you are imagining.">${getValue(key + "Note")}</textarea></label>`;
}

function fields(rows) {
  return `<div class="field-grid">${rows.map(([key, label, placeholder]) => `
    <label class="field ${key.includes("Note") || key === "calling" ? "full" : ""}">
      <span>${label}</span><input data-key="${key}" value="${getValue(key)}" placeholder="${placeholder}">
    </label>`).join("")}</div>`;
}

function breedHair() {
  const pet = getValue("petType", "Cat");
  const cat = ["Short Hair", "Semi-long Hair", "Long Hair", "Hairless", "British Shorthair", "Ragdoll", "Maine Coon", "Tabby", "Orange Tabby", "Calico", "Domestic Cat", "Mixed Breed", "Not Sure"];
  const dog = ["Small Dog", "Medium Dog", "Large Dog", "Giant Dog", "Short Hair", "Curly Hair", "Double Coat", "Poodle", "Corgi", "Shiba Inu", "Golden Retriever", "Labrador", "Samoyed", "Husky", "French Bulldog", "Mixed Breed", "Not Sure"];
  return options("breedHair", (pet === "Dog" ? dog : cat).map(x => [x, pet === "Dog" ? "Dog profile option" : "Cat profile option"]));
}

function photoUpload() {
  const slots = ["Front", "Side", "Back", "Face", "Markings", "Classic expression"];
  return `<div class="upload-grid">${slots.map(slot => `
    <label class="upload-slot"><strong>${slot}</strong><small> JPG / PNG / WEBP</small><input data-photo-slot="${slot}" type="file" accept="image/*"></label>
  `).join("")}</div>
  <p class="step-help">${getValue("photoNames", "No photos selected yet.")}</p>
  <label class="field full"><span>Photo notes</span><textarea data-key="photoNote" placeholder="例如：第二张最像它平时的表情。">${getValue("photoNote")}</textarea></label>`;
}

function craftConfig() {
  const craft = getValue("craftDirection", "Wood Carving");
  const groups = {
    "Wood Carving": [["size", ["5 cm Mini", "10 cm Standard", "15 cm Large", "20 cm+ Custom"]], ["material", ["Cherry-like Wood", "Oak-like Wood", "Walnut-like Wood", "Maple-like Wood", "Not Sure"]], ["complexity", ["Simple Silhouette", "Stylized Pet Figure", "Detailed Pet Figure", "High Detail Artisan Custom"]], ["addons", ["Name Engraving", "Date Engraving", "Wooden Base", "Gift Box", "Multiple Pets"]]],
    "Mother-of-Pearl Inlay": [["objectForm", ["Small Pendant", "Name Plate", "Memorial Plaque", "Jewelry Box / Memory Box"]], ["size", ["3-5 cm Mini", "8-10 cm Standard", "12-15 cm Display", "Custom Size"]], ["shellShine", ["Blue-Green Shine", "Pink-Purple Shine", "Golden Shine", "Mixed Shell Shine"]], ["pattern", ["Name Only", "Pet Silhouette", "Pet Face Outline", "Floral / Cloud Pattern", "Highly Detailed Custom Inlay"]]],
    "Blue-and-White Porcelain": [["objectForm", ["Ceramic Pet Tile", "Blue-and-White Plate", "Small Figurine", "Mini Vase", "Incense Holder"]], ["size", ["5 cm Mini", "10 cm Standard", "15 cm Display", "20 cm+ Collector Size"]], ["visualStyle", ["Simple Pet Portrait", "Pet Silhouette", "Floral Pattern", "Cloud / Wave Pattern", "Small Story Scene"]], ["glaze", ["Classic Blue-and-White", "Softer Pale Blue", "Deep Cobalt Blue", "Blue + Small Gold Detail"]]]
  };
  const selected = groups[craft] || groups["Wood Carving"];
  return selected.map(([key, opts]) => `<h3>${key}</h3>${options(key, opts.map(x => [x, "Estimated add-on only"]))}`).join("") +
    fields([["budget", "Budget", "$200 - $400 / still exploring"], ["timeline", "Timeline", "No rush / before birthday"], ["contact", "Contact Information", "email / Instagram / phone"]]) +
    `<div class="brief-row"><strong>Estimated Add-on Total</strong><span>${estimateAddons()} · Final Quote: To be confirmed</span></div>`;
}

function estimateAddons() {
  const score = ["size", "material", "complexity", "objectForm", "shellShine", "pattern", "visualStyle", "glaze", "addons"]
    .filter(key => getValue(key)).length;
  return `$${Math.max(30, score * 25)}+`;
}

function reviewBrief() {
  const rows = [
    ["Pet Profile", `${getValue("petType", "Cat")} · ${getValue("petName", "Unnamed pet")} · ${getValue("breedHair", "Not sure")}`],
    ["Body / Markings", `${getValue("bodyShape", "Not selected")} · ${getValue("colorMarkings", "Not selected")}`],
    ["Face / Pose", `${getValue("expression", "Not selected")} · ${getValue("pose", "Not selected")}`],
    ["Reference Photos", getValue("photoNames", "No photos selected in demo")],
    ["Object Type", getValue("objectType", "Not Sure")],
    ["Craft Direction", getValue("craftDirection", "Not Sure")],
    ["Size / Material / Style", [getValue("size"), getValue("material"), getValue("objectForm"), getValue("visualStyle"), getValue("glaze")].filter(Boolean).join(" · ") || "To be recommended"],
    ["Estimated Add-ons", estimateAddons()],
    ["Budget / Timeline", `${getValue("budget", "Not provided")} · ${getValue("timeline", "Not provided")}`],
    ["Contact", getValue("contact", "Not provided")],
    ["Final Quote", "To be confirmed"]
  ];
  return `<div class="brief-preview">${rows.map(([k, v]) => `<div class="brief-row"><strong>${k}</strong><span>${v}</span></div>`).join("")}</div>
    <div class="button-row"><button class="button secondary" type="button" data-edit-step="1">Edit Pet Profile</button><button class="button secondary" type="button" data-edit-step="7">Edit Photos</button><button class="button secondary" type="button" data-edit-step="9">Edit Craft</button></div>`;
}

function successPanel() {
  return `<div class="success-panel"><h3>Submission received</h3><p>正式版会保存数据库并发邮件给管理员。这个 demo 已保存到本地 Admin Demo。</p>
  <div class="button-row"><a class="button primary route-link" href="#admin">View Admin Demo</a><a class="button secondary route-link" href="#home">Back to Home</a><a class="button secondary route-link" href="#gallery">View Product Gallery</a></div></div>`;
}

function renderWizard() {
  const step = wizardSteps[currentStep];
  document.querySelector("#progress-number").textContent = `${currentStep + 1}/13`;
  document.querySelector("#progress-label").textContent = step.label;
  document.querySelector("#progress-bar").style.width = `${((currentStep + 1) / wizardSteps.length) * 100}%`;
  document.querySelector("#step-eyebrow").textContent = `Step ${currentStep + 1}`;
  document.querySelector("#step-list").innerHTML = wizardSteps.map((s, i) => `<li class="${i === currentStep ? "active" : ""}"><span>${i + 1}</span>${s.label}</li>`).join("");
  document.querySelector("#step-panel").innerHTML = `<h2>${step.title}</h2><p class="step-help">${step.help}</p>${step.render()}`;
  document.querySelector("#prev-step").disabled = currentStep === 0;
  document.querySelector("#next-step").textContent = currentStep === 11 ? "Submit Brief for Quote" : currentStep === 12 ? "Submit Another Brief" : "Continue";
}

function submitBrief() {
  const submissions = JSON.parse(localStorage.getItem(submissionsKey) || "[]");
  const record = {
    id: `BRF-${String(Date.now()).slice(-6)}`,
    status: "Submitted",
    createdAt: new Date().toLocaleString(),
    ...brief,
    estimatedAddons: estimateAddons()
  };
  submissions.unshift(record);
  localStorage.setItem(submissionsKey, JSON.stringify(submissions));
}

function renderCards() {
  const objectHtml = objects.map(([en, zh, craftList, use, desc]) => `<article class="card">
    <h3>${zh}</h3><p><strong>${en}</strong></p><p>${desc}</p>
    <div class="tag-row">${craftList.map(c => `<span class="tag">${c}</span>`).join("")}</div>
    <p><strong>Best use:</strong> ${use}</p>
    <div class="card-actions"><button class="mini-button">View Object Detail</button><a class="mini-button dark route-link" href="#custom">Start Customizing</a><a class="mini-button route-link" href="#contact">Ask if This Can Be Made</a></div>
  </article>`).join("");
  document.querySelector(".preview-grid").innerHTML = objects.slice(0, 3).map(([en, zh, craftList, use, desc]) => `<article class="card">
    <h3>${zh}</h3><p><strong>${en}</strong></p><p>${desc}</p>
    <div class="tag-row">${craftList.map(c => `<span class="tag">${c}</span>`).join("")}</div>
    <p><strong>Best use:</strong> ${use}</p>
    <div class="card-actions"><button class="mini-button">View Object Detail</button><a class="mini-button dark route-link" href="#custom">Start Customizing</a></div>
  </article>`).join("");
  document.querySelector("#gallery-grid").innerHTML = objectHtml;
  document.querySelector("#gallery-filters").innerHTML = ["All Objects", "Pet Figurine", "Memorial Plaque", "Pendant / Keychain", "Jewelry Box", "Porcelain Plate", "Not Sure"].map((x, i) => `<button class="chip ${i === 0 ? "active" : ""}">${x}</button>`).join("");

  const craftHtml = crafts.map(c => `<article class="card">
    <h3>${c.color} ${c.zh}</h3><p><strong>${c.name}</strong></p><p>${c.intro}</p>
    <div class="tag-row">${c.options.slice(0, 4).map(o => `<span class="tag">${o}</span>`).join("")}</div>
    <div class="card-actions"><button class="mini-button" data-craft="${c.key}">Learn ${c.zh}</button><a class="mini-button dark route-link" href="#custom">Customize with This Craft</a></div>
  </article>`).join("");
  document.querySelector(".preview-crafts").innerHTML = craftHtml;
  document.querySelector("#craft-overview").innerHTML = craftHtml;
  renderCraftDetail(crafts[0]);

  document.querySelector("#story-grid").innerHTML = stories.map(([id, title, tag, desc]) => `<article class="card"><h3>${title}</h3><p><strong>${tag}</strong></p><p>${desc}</p><div class="card-actions"><button class="mini-button">View Story</button><a class="mini-button dark route-link" href="#custom">Make Something Similar</a></div></article>`).join("");
  document.querySelector("#faq-list").innerHTML = faqs.map(([q, a]) => `<article class="faq-item"><h3>${q}</h3><p>${a}</p></article>`).join("");
}

function renderCraftDetail(craft) {
  document.querySelector("#craft-detail").innerHTML = `<p class="eyebrow">Craft Detail</p><h2>${craft.zh} · ${craft.name}</h2><p>${craft.intro}</p><ul>${craft.options.map(o => `<li>${o}</li>`).join("")}</ul><div class="button-row"><a class="button primary route-link" href="#custom">Start ${craft.zh} Brief</a><a class="button secondary route-link" href="#contact">Contact Us About ${craft.zh}</a></div>`;
}

function renderAdmin() {
  const submissions = JSON.parse(localStorage.getItem(submissionsKey) || "[]");
  const counts = {
    "Total Briefs": submissions.length,
    Submitted: submissions.filter(x => x.status === "Submitted").length,
    Reviewing: submissions.filter(x => x.status === "Reviewing").length,
    "Quote Preparing": submissions.filter(x => x.status === "Quote Preparing").length
  };
  document.querySelector("#admin-dashboard").innerHTML = Object.entries(counts).map(([k, v]) => `<article class="admin-tile"><strong>${v}</strong><span>${k}</span></article>`).join("");
  document.querySelector("#admin-list").innerHTML = `<div class="admin-row header"><span>Brief ID</span><span>Pet</span><span>Craft</span><span>Status</span><span>Created</span></div>` +
    (submissions.length ? submissions.map(x => `<div class="admin-row"><strong>${x.id}</strong><span>${x.petName || "Unnamed"} · ${x.petType || "Cat"}</span><span>${x.craftDirection || "Not Sure"}</span><span>${x.status}</span><span>${x.createdAt}</span></div>`).join("") : `<div class="admin-row"><span>No submissions yet. Submit the wizard once to populate this demo admin.</span></div>`);
}

function routeTo(hash) {
  const id = (hash || location.hash || "#home").replace("#", "") || "home";
  const normalized = id === "brief" ? "custom" : id;
  routeIds.forEach(route => document.getElementById(route).classList.toggle("active", route === normalized));
  document.querySelectorAll(".top-nav a").forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${normalized}`));
  document.querySelector(".top-nav").classList.remove("open");
  if (normalized === "admin") renderAdmin();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.addEventListener("input", event => {
  const target = event.target;
  if (target.dataset.key) setValue(target.dataset.key, target.value);
  if (target.dataset.photoSlot) {
    const names = [getValue("photoNames"), target.files?.[0]?.name].filter(Boolean).join(", ");
    setValue("photoNames", names);
    renderWizard();
  }
});

document.addEventListener("change", event => {
  const target = event.target;
  if (target.type === "radio") {
    setValue(target.name, target.value);
    if (target.name === "petType" && target.value === "Other Animal") {
      setValue("objectType", "Custom Object");
    }
    renderWizard();
  }
});

document.addEventListener("click", event => {
  const edit = event.target.closest("[data-edit-step]");
  if (edit) {
    currentStep = Number(edit.dataset.editStep);
    saveBrief();
    renderWizard();
  }
  const craftButton = event.target.closest("[data-craft]");
  if (craftButton) {
    const craft = crafts.find(c => c.key === craftButton.dataset.craft);
    if (craft) renderCraftDetail(craft);
  }
});

document.querySelector("#prev-step").addEventListener("click", () => {
  currentStep = Math.max(0, currentStep - 1);
  saveBrief();
  renderWizard();
});

document.querySelector("#next-step").addEventListener("click", () => {
  if (currentStep === 11) submitBrief();
  if (currentStep === 12) {
    Object.keys(brief).forEach(key => delete brief[key]);
    currentStep = 0;
  } else {
    currentStep = Math.min(wizardSteps.length - 1, currentStep + 1);
  }
  saveBrief();
  renderWizard();
});

document.querySelector("#save-draft").addEventListener("click", () => {
  saveBrief();
  const button = document.querySelector("#save-draft");
  button.textContent = "Saved";
  setTimeout(() => (button.textContent = "Save Draft"), 900);
});

document.querySelector(".menu-button").addEventListener("click", () => {
  document.querySelector(".top-nav").classList.toggle("open");
});

window.addEventListener("hashchange", () => routeTo(location.hash));

renderCards();
renderWizard();
renderAdmin();
routeTo(location.hash || "#home");
