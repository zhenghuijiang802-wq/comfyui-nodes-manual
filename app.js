const typeTranslations = {
            "MODEL": "模型 (MODEL)",
            "LATENT": "潜空间 (LATENT)",
            "IMAGE": "图像 (IMAGE)",
            "CONDITIONING": "提示词条件 (CONDITIONING)",
            "CLIP": "文本编码器 (CLIP)",
            "VAE": "自编码器 (VAE)",
            "INT": "整数数值 (INT)",
            "FLOAT": "浮点数值 (FLOAT)",
            "STRING": "文本字符 (STRING)",
            "BOOLEAN": "布尔开关 (BOOLEAN)",
            "MASK": "遮罩蒙版 (MASK)",
            "CONTROL_NET": "控制网 (CONTROL_NET)",
            "UPSCALE_MODEL": "超分放大模型 (UPSCALE_MODEL)",
            "STYLE_MODEL": "风格模型 (STYLE_MODEL)",
            "LORAPATCH": "Lora修补 (LORAPATCH)",
            "COMFY": "核心框架 (COMFY)",
            "CHECKPOINT": "Checkpoint大模型 (CHECKPOINT)"
        };

        const glossaryTerms = [
            { term: "Node / 节点", aliases: ["节点", "算子"], definition: "ComfyUI 里的一个处理单元。它接收输入，执行一段功能，再输出结果。", example: "KSampler 是生成核心节点，SaveImage 是保存结果 of 节点。" },
            { term: "Link / 连线", aliases: ["连接", "边"], definition: "节点之间的数据通道。只有类型匹配的输出和输入才应该连接。", example: "IMAGE 输出通常接 IMAGE 输入，LATENT 输出通常接 LATENT 输入。" },
            { term: "Checkpoint", aliases: ["大模型", "ckpt", "safetensors"], definition: "生成图像的主模型文件，决定基础画风、能力范围和模型家族。", example: "SD1.5、SDXL、Flux 都对应不同类型的 checkpoint 或模型文件。" },
            { term: "MODEL", aliases: ["扩散模型", "主模型"], definition: "ComfyUI 中传递大模型权重的插槽类型，通常来自 CheckpointLoaderSimple 或 LoRA 节点。", example: "MODEL 接到 KSampler.model 才能开始采样生成。" },
            { term: "CLIP", aliases: ["文本编码器", "Text Encoder"], definition: "把提示词文本转换成模型可以理解的向量条件。", example: "CheckpointLoaderSimple 的 CLIP 输出接到 CLIPTextEncode.clip。" },
            { term: "VAE", aliases: ["自编码器"], definition: "负责在普通图像 IMAGE 和潜空间 LATENT 之间转换。", example: "KSampler 之后接 VAEDecode，把 LATENT 解码成 IMAGE。" },
            { term: "LATENT", aliases: ["潜空间", "samples"], definition: "模型内部使用的压缩图像表示，不是最终可直接看的图片。", example: "EmptyLatentImage 创建空 LATENT，KSampler 在 LATENT 里去噪。" },
            { term: "IMAGE", aliases: ["像素图", "图片"], definition: "普通图片数据，可以预览、保存、放大、裁剪或送进图像处理节点。", example: "VAEDecode 输出 IMAGE，接 SaveImage 保存。" },
            { term: "CONDITIONING", aliases: ["条件", "提示词条件"], definition: "提示词、ControlNet、风格或区域控制被编码后的条件数据。", example: "CLIPTextEncode 输出 CONDITIONING，接 KSampler.positive 或 negative。" },
            { term: "Positive Prompt", aliases: ["正向提示词", "正面词"], definition: "描述你希望画面出现什么。", example: "portrait, soft light, detailed eyes 可以放在正向提示词里。" },
            { term: "Negative Prompt", aliases: ["反向提示词", "负面词"], definition: "描述你希望模型避免什么。", example: "blurry, low quality, extra fingers 常放在反向提示词里。" },
            { term: "KSampler", aliases: ["采样器", "生成核心"], definition: "把模型、提示词条件和潜空间合起来执行扩散去噪，是多数生图流程的核心。", example: "MODEL + positive + negative + latent_image 输入 KSampler，输出新的 LATENT。" },
            { term: "Sampler", aliases: ["采样算法"], definition: "决定每一步怎么从噪声靠近图像的算法。", example: "euler、dpmpp_2m、dpmpp_2m_sde 都是常见 sampler。" },
            { term: "Scheduler", aliases: ["调度器"], definition: "决定采样过程中噪声强度如何变化的节奏。", example: "同一个 sampler 搭配不同 scheduler，质感和稳定性可能不同。" },
            { term: "Steps", aliases: ["步数", "采样步数"], definition: "去噪迭代次数。更多步数更慢，不一定更好。", example: "SDXL 常从 20-30 步试起，Flux 可能按模型推荐设置。" },
            { term: "CFG", aliases: ["提示词引导强度", "Classifier-Free Guidance"], definition: "控制模型听提示词的程度。太高可能僵硬，太低可能不听话。", example: "很多 SD 模型可从 CFG 5-8 试起，Flux 类流程可能不使用传统 CFG。" },
            { term: "Denoise", aliases: ["重绘强度", "去噪强度"], definition: "控制保留原图还是大幅改写。数值越高变化越大。", example: "图生图可从 0.35-0.65 试起，文生图通常是 1.0。" },
            { term: "Seed", aliases: ["随机种子"], definition: "随机性的编号。固定 seed 可以复现接近相同的结果。", example: "想微调同一张图，就固定 seed 后只改一个参数。" },
            { term: "Batch", aliases: ["批次", "批量"], definition: "一次处理多张图或多组数据。批次越大越占显存。", example: "调试阶段 batch_size 先设 1，确认后再增加。" },
            { term: "Mask", aliases: ["遮罩", "蒙版"], definition: "用黑白或灰度标记哪些区域被处理。通常白色处理、黑色保留。", example: "Inpaint 时用 MASK 指定只重绘脸或手。" },
            { term: "Inpaint", aliases: ["局部重绘"], definition: "只修改图像的一部分，通常依赖原图和遮罩。", example: "脸崩时用遮罩圈住脸，再用较低 denoise 重绘。" },
            { term: "ControlNet", aliases: ["控制网"], definition: "用边缘、姿势、深度、线稿等参考图控制生成结构。", example: "OpenPose 控制人物姿势，Canny 控制线条轮廓。" },
            { term: "Preprocessor", aliases: ["预处理器"], definition: "把普通参考图转换成 ControlNet 更适合读取的控制图。", example: "CannyEdgePreprocessor 会从图片提取边缘图。" },
            { term: "LoRA", aliases: ["低秩微调", "角色/风格模型"], definition: "小型微调模型，用来注入人物、画风、服装或特殊能力。", example: "LoraLoader 输出新的 MODEL 和 CLIP，再接采样和提示词节点。" },
            { term: "Upscale", aliases: ["放大", "超分"], definition: "把图片变大，可能只是插值，也可能用超分模型补细节。", example: "UpscaleModelLoader + ImageUpscaleWithModel 是常见超分组合。" },
            { term: "Hi-Res Fix", aliases: ["高清修复", "二次采样"], definition: "先低分辨率出图，再放大后用较低 denoise 二次采样补细节。", example: "LatentUpscale 后接 KSampler，denoise 通常低于文生图。" },
            { term: "SIGMAS", aliases: ["噪声序列", "sigma"], definition: "采样每一步的噪声强度序列，高级采样流程会直接传递它。", example: "Scheduler 节点常输出 SIGMAS 给自定义采样器。" },
            { term: "Guider", aliases: ["引导器"], definition: "高级采样流程中负责把条件转成去噪引导逻辑的对象。", example: "SamplerCustomAdvanced 一类流程常会出现 guider 相关节点。" },
            { term: "Embedding", aliases: ["Textual Inversion", "嵌入"], definition: "可在提示词中调用的小型概念向量，常用于人物、风格或负面质量词。", example: "有些负面词包会以 embedding 文件形式放在模型目录里。" },
            { term: "IPAdapter", aliases: ["图像提示", "图像参考"], definition: "用一张或多张参考图影响内容、风格、构图或人物相似度。", example: "想保持角色脸或产品外观时，经常会用 IPAdapter 类节点。" },
            { term: "Flux", aliases: ["FLUX.1"], definition: "一种较新的图像生成模型家族，节点和参数习惯与 SD1.5/SDXL 有差异。", example: "Flux 流程常见专用 loader、guidance 和文本编码节点。" },
            { term: "SDXL", aliases: ["Stable Diffusion XL"], definition: "常见的高分辨率 Stable Diffusion 模型家族。", example: "SDXL 基础画幅常从 1024 附近开始。" }
        ];

        // State
        let activeFilterType = "none";
        // State for ComfyUI integration
        let selectedNodeIds = [];
        let comfyuiAddr = localStorage.getItem("comfyui_addr") || "http://127.0.0.1:8188"; // 'category', 'package', 'bookmarks', 'notes', 'none'
        let activeFilterPath = "";
        let searchQuery = "";
        let visibleCount = 50;
        let currentMapBucket = null; 

        // Bookmarks & Notes
        let bookmarks = JSON.parse(localStorage.getItem("comfyui_bookmarks") || "[]");
        let notes = JSON.parse(localStorage.getItem("comfyui_notes") || "{}");

        // DOM Refs
        const searchInput = document.getElementById("search-input");
        const nodeGrid = document.getElementById("node-grid");
        const statusText = document.getElementById("status-text");
        const loadMoreContainer = document.getElementById("load-more-container");
        const btnLoadMore = document.getElementById("btn-load-more");
        const toast = document.getElementById("toast");
        const quickSearchButtons = document.querySelectorAll(".quick-search");
        const functionMap = document.getElementById("function-map");
        const glossarySearch = document.getElementById("glossary-search");
        const glossaryChips = document.getElementById("glossary-chips");
        const glossaryResults = document.getElementById("glossary-results");
        const menuTreeContainer = document.getElementById("menu-tree");
        const pkgTreeContainer = document.getElementById("pkg-tree");
        const modelTreeContainer = document.getElementById("model-tree");

        function escapeHTML(value) {
            return String(value ?? "").replace(/[&<>"']/g, (char) => ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#039;"
            }[char]));
        }

        function safeDomId(value) {
            return String(value ?? "").replace(/[^a-zA-Z0-9_-]/g, "_");
        }

        function renderList(items, ordered = false) {
            const safeItems = (items || []).filter(Boolean).slice(0, 5);
            if (safeItems.length === 0) return "";
            const tag = ordered ? "ol" : "ul";
            return `<${tag} class="guide-list">${safeItems.map(item => `<li>${escapeHTML(item)}</li>`).join("")}</${tag}>`;
        }

        function renderGuideTips(items) {
            const tips = (items || [])
                .filter(item => item && item.tip)
                .slice(0, 4)
                .map(item => `${item.name}: ${item.tip}`);
            return renderList(tips, false);
        }

        function renderUsageGuide(node) {
            const flow = node.connection_flow || {
                before: "接入同类型上游输出",
                node: node.display_name || node.id,
                after: "接给同类型下游输入"
            };
            const tipsHTML = renderGuideTips(node.input_guides);
            const outputTipsHTML = renderGuideTips(node.output_guides);
            const rightColumn = tipsHTML || outputTipsHTML || renderList(["先保持默认值跑通流程，再按效果优化参数。"], false);
            
            return `
                <div class="usage-guide">
                    <div class="usage-guide-header">
                        <span class="usage-guide-title">连线指南</span>
                        <span class="usage-role">${escapeHTML(node.workflow_role || "基础节点")}</span>
                    </div>
                    <div class="when-to-use"><b>推荐场景：</b>${escapeHTML(node.when_to_use || "在对应流程位置中输入对应类型插槽。")}</div>
                    <div class="connection-flow">
                        <div class="connection-chip" title="${escapeHTML(flow.before)}">${escapeHTML(flow.before)}</div>
                        <div class="connection-arrow">→</div>
                        <div class="connection-chip current" title="${escapeHTML(flow.node)}">${escapeHTML(flow.node)}</div>
                        <div class="connection-arrow">→</div>
                        <div class="connection-chip" title="${escapeHTML(flow.after)}">${escapeHTML(flow.after)}</div>
                    </div>
                    <div class="guide-columns">
                        <div>
                            <div class="guide-mini-title">操作要点</div>
                            ${renderList(node.quick_steps, true)}
                        </div>
                        <div>
                            <div class="guide-mini-title">接口与属性提示</div>
                            ${rightColumn}
                        </div>
                    </div>
                </div>
            `;
        }

        function getSocketClass(type) {
            if (!type) return "socket-other";
            const t = type.toUpperCase();
            if (t.includes("MODEL")) return "socket-model";
            if (t.includes("LATENT")) return "socket-latent";
            if (t.includes("IMAGE")) return "socket-image";
            if (t.includes("CONDITIONING")) return "socket-conditioning";
            if (t.includes("CLIP")) return "socket-clip";
            if (t.includes("VAE")) return "socket-vae";
            if (t.includes("INT") || t.includes("FLOAT") || t.includes("NUMBER") || t.includes("VAL")) return "socket-number";
            if (t.includes("STRING") || t.includes("TEXT")) return "socket-string";
            if (t.includes("BOOLEAN") || t.includes("BOOL")) return "socket-boolean";
            return "socket-other";
        }

        function translateType(type) {
            if (!type) return "未知";
            const upper = type.toUpperCase();
            for (const [eng, zh] of Object.entries(typeTranslations)) {
                if (upper === eng || upper.startsWith(eng)) {
                    return zh;
                }
            }
            return type;
        }

        // Panel Switcher
        window.switchPanel = switchPanel;
        function switchPanel(panelId) {
            document.querySelectorAll(".panel").forEach(p => p.classList.remove("active"));
            const target = document.getElementById(panelId);
            if (target) target.classList.add("active");

            // Update nav selection active class
            document.querySelectorAll(".nav-item").forEach(item => {
                if (item.getAttribute("data-target") === panelId) {
                    item.classList.add("active");
                } else {
                    item.classList.remove("active");
                }
            });

            // Clear sidebar tree active states if not explorer panel
            if (panelId !== "explorer-panel") {
                document.querySelectorAll(".tree-header").forEach(h => h.classList.remove("active"));
                activeFilterType = "none";
                activeFilterPath = "";
            }
            
            // Reset map subcategories when switching views
            if (panelId === "map-panel") {
                currentMapBucket = null;
                renderFunctionalMap();
            }
        }

        // Sidebar selection filter logic
        function selectFilter(path, type) {
            activeFilterType = type;
            activeFilterPath = path;
            visibleCount = 50;

            const breadcrumbs = document.getElementById("breadcrumbs");
            if (type === 'category') {
                const parts = path.split(" ➔ ");
                let html = `<span class="breadcrumb-link" onclick="switchPanel('map-panel')">分类菜单</span>`;
                let accumulatedPath = "";
                parts.forEach((part, index) => {
                    accumulatedPath += (index > 0 ? " ➔ " : "") + part;
                    if (index === parts.length - 1) {
                        html += ` ➔ <span>${escapeHTML(part)}</span>`;
                    } else {
                        const escapedPath = escapeHTML(accumulatedPath).replace(/'/g, "\'");
                        html += ` ➔ <span class="breadcrumb-link" onclick="selectFilter('${escapedPath}', 'category')">${escapeHTML(part)}</span>`;
                    }
                });
                breadcrumbs.innerHTML = html;
            } else if (type === 'package') {
                const mainParts = path.split(" | ");
                const pkgName = mainParts[0];
                const subCatPath = mainParts[1] || "";
                
                let html = `<span class="breadcrumb-link" onclick="switchPanel('pkg-panel')">插件包</span>`;
                
                if (!subCatPath) {
                    html += ` ➔ <span>${escapeHTML(pkgName)}</span>`;
                } else {
                    const escapedPkg = escapeHTML(pkgName).replace(/'/g, "\'");
                    html += ` ➔ <span class="breadcrumb-link" onclick="selectFilter('${escapedPkg}', 'package')">${escapeHTML(pkgName)}</span>`;
                    
                    const subParts = subCatPath.split(" ➔ ");
                    let accumulatedSub = "";
                    subParts.forEach((part, index) => {
                        accumulatedSub += (index > 0 ? " ➔ " : "") + part;
                        if (index === subParts.length - 1) {
                            html += ` ➔ <span>${escapeHTML(part)}</span>`;
                        } else {
                            const escapedPath = escapeHTML(pkgName + " | " + accumulatedSub).replace(/'/g, "\'");
                            html += ` ➔ <span class="breadcrumb-link" onclick="selectFilter('${escapedPath}', 'package')">${escapeHTML(part)}</span>`;
                        }
                    });
                }
                breadcrumbs.innerHTML = html;
            } else if (type === 'model') {
                breadcrumbs.innerHTML = `<span class="breadcrumb-link" onclick="switchPanel('explorer-panel')">核心模型</span> ➔ <span>${escapeHTML(path)}</span>`;
            } else if (type === 'bookmarks') {
                breadcrumbs.innerHTML = `我的空间 ➔ <span>我的收藏</span>`;
            } else if (type === 'notes') {
                breadcrumbs.innerHTML = `我的空间 ➔ <span>学习笔记</span>`;
            }

            switchPanel("explorer-panel");
            renderNodes();
        }
        window.selectFilter = selectFilter;

        // Category Map initialization & click
        const subgroupDescriptions = {
            // 提示词与条件控制
            "基础文本编码": "CLIPTextEncode 等将文本转为模型可识别条件的节点。",
            "条件控制与连接": "合并、拼接、混合与设置区域条件（Conditioning）的节点。",
            "高级条件注入": "IP-Adapter、风格注入、FLUX 专用引导等高级条件控制。",

            // 遮罩、局部重绘与区域控制
            "遮罩绘制与生成": "创建、绘制空遮罩，加载遮罩或从通道中提取遮罩的节点。",
            "遮罩变换与运算": "遮罩反转、模糊、膨胀、腐蚀、混合、羽化与数学运算操作。",
            "局部重绘与区域控制": "Inpaint 模型应用、区域条件限制与遮罩-潜空间互转节点。",

            // ControlNet 与结构参考
            "预处理器 (Preprocessors)": "线稿、姿态、深度图、法线图等控制网参考图的提取与预处理。",
            "模型加载与应用": "ControlNet 模型的加载与应用到当前渲染流程的连接节点。",

            // 批处理、列表、路由与逻辑
            "控制流与路由": "Switch 切换器、节点选择器、路由与任意类型转发节点。",
            "逻辑与数学运算": "数值计算、字符串操作、逻辑判断（与/或/非）及比较节点。",
            "批处理与列表": "图片/潜数据批次构建、列表合并与循环迭代控制节点。",

            // 图像输入输出与处理
            "输入输出 (I/O)": "加载图像、保存图像、屏幕预览与外部图像通道收发节点。",
            "图像色彩与滤镜": "对比度、亮度调整、滤镜模糊、色彩匹配、色调混合等处理。",
            "基础图像变换": "裁剪、旋转、缩放、填充、遮罩剪切等形状与分辨率调整。",

            // 文本、提示词工具与通配符
            "提示词预处理 & 通配符": "通配符词包加载、动态提示词生成、预置提示词模板。",
            "LLM与智能生成": "翻译接口、大语言模型 prompt 润色与自动提示词生成节点。",
            "文本操作与拼接": "字符串连接、分割、替换、文本列表化等操作节点。",

            // 视频、音频与时间序列
            "视频加载与帧提取": "视频文件读取、GIF 加载、批量帧分割与序列初始化。",
            "视频保存与编码": "多帧合成视频、GIF 保存、AnimateDiff 帧编码器节点。",
            "多帧动画与插帧": "帧率转换、光流估算、补帧（插值）、动效生成与合成。",
            "音频处理与驱动": "音频加载、音轨可视化、声控波形以及音频驱动人脸/表情节点。",

            // 采样、调度与噪声
            "基础采样器 (Samplers)": "KSampler 等核心扩散去噪采样器与自定义采样器。",
            "调度器与步数 (Schedulers & Sigmas)": "噪声序列（Sigmas）、步数生成器与 CFG 缩放引导器。",
            "噪声注入与控制": "随机种子生成、自定义噪声注入、噪声相加与噪声消除控制。",

            // 潜空间与画布
            "编码与解码 (VAE Encode/Decode)": "图像与潜数据互转，包括 VAE 编码、VAE 解码等节点。",
            "潜空间混合与蒙版": "潜数据融合、通道合并、基于遮罩的 Latent 混合与重叠。",
            "潜空间基础变换": "空潜空间画布（Empty Latent）生成、潜数据缩放、裁剪与旋转。",

            // 放大、高清修复与细节增强
            "人脸与人体修复": "FaceDetailer、HandDetailer、SEGS 面部细节自动修饰重绘。",
            "图像与潜空间超分": "SD 高清修复、模型超分辨率放大（Upscale）、像素级差值放大。",

            // 检测、分割、人脸与人体
            "智能分割与蒙版提取 (SAM)": "Segment Anything (SAM)、提示词自动抠图、二值化分割。",
            "人物检测与人脸分析": "YOLO 目标检测、人脸标志点定位、OpenPose 骨骼姿态提取。",

            // 模型与资源加载
            "大模型与 VAE 加载": "加载 Checkpoint 大模型、扩散模型（UNET）以及 VAE 自编码器。",
            "微调模型加载 (LoRA/LyCORIS)": "LoRA 角色模型、画风模型、LoRA 堆叠（Lora Stack）加载器。",
            "特征与引导模型加载": "ControlNet 控制模型、IP-Adapter 图像引导与 CLIP 文本编码加载。",

            // API、元数据与调试
            "数据流调试与信息打印": "控制台打印、文本屏幕显示、数据类型检查与中继节点。",
            "元数据读写": "图像内置 PNG 标签、EXIF 信息读写与参数导出工具。",
            "网络与外部API接口": "网络图像拉取、API 参数响应以及 WebSocket 数据流中继节点。",

            // 训练、模型合并与模型修补
            "模型合并": "大模型、LoRA模型、CLIP权重按比例混合与平均合并节点。",
            "模型修补与微调": "FreeU 结构优化、模型噪声修补、网络权重特定注入（Patches）。",

            // 基础生成链路
            "文生图主干 (Txt2Img Core)": "跑通最经典文本生成图像的极简节点（大模型-提示词-采样-解码）。",
            "图生图主干 (Img2Img Core)": "跑通图像重绘/风格转换的极简节点（载图-编码-采样-解码）。",

            // 3D、相机与空间
            "空间/相机": "3D 网格生成、深度相机映射以及多维空间投影转换。",
            
            // 其他 / 插件专用
            "插件通用": "无法归入主流大类的第三方插件特定逻辑与过渡节点。"
        };

        function getFunctionalSubgroup(node) {
            const bucket = node.functional_bucket || node.functional_group || "其他 / 插件专用";
            const id = (node.id || "").toLowerCase();
            const cat = (node.translated_category || "").toLowerCase();

            if (bucket === "提示词与条件控制") {
                if (id.includes("encode") || id.includes("prompt") || cat.includes("prompt") || cat.includes("text")) {
                    return "基础文本编码";
                }
                if (id.includes("combine") || id.includes("concat") || id.includes("average") || id.includes("setarea") || (id.includes("conditioning") && (id.includes("add") || id.includes("mix")))) {
                    return "条件控制与连接";
                }
                return "高级条件注入";
            }

            if (bucket === "遮罩、局部重绘与区域控制") {
                if (id.includes("inpaint") || id.includes("outpaint") || id.includes("regional") || id.includes("latentfrommask") || id.includes("latent_from_mask") || id.includes("setmask") || id.includes("set_mask") || id.includes("applymask") || id.includes("apply_mask") || id.includes("properties") || id.includes("prop") || id.includes("hook") || id.includes("dancer") || id.includes("expand") || id.includes("fill") || id.includes("edit") || id.includes("cosm") || id.includes("wan") || id.includes("vidu") || id.includes("kling") || id.includes("luma") || id.includes("sora") || id.includes("cogvideo") || id.includes("ltxv") || id.includes("hunyuan") || id.includes("3d") || id.includes("animation") || id.includes("runway") || id.includes("pika") || id.includes("minimax") || id.includes("bytedance")) {
                    return "局部重绘与区域控制";
                }
                if (id.includes("invert") || id.includes("dilate") || id.includes("erode") || id.includes("blur") || id.includes("logic") || id.includes("composite") || id.includes("math") || id.includes("grow") || id.includes("feather") || id.includes("threshold") || id.includes("crop") || id.includes("scale") || id.includes("resize") || id.includes("pad") || id.includes("batch") || id.includes("split") || id.includes("join") || id.includes("add") || id.includes("subtract") || id.includes("multiply") || id.includes("divide") || id.includes("blend") || id.includes("morphology") || id.includes("smooth") || id.includes("clean") || id.includes("filter") || id.includes("op") || id.includes("operation")) {
                    return "遮罩变换与运算";
                }
                return "遮罩绘制与生成";
            }

            if (bucket === "ControlNet 与结构参考") {
                if (id.includes("preprocess") || id.includes("preprocessor") || cat.includes("preprocess") || id.includes("pose") || id.includes("canny") || id.includes("depth") || id.includes("lineart")) {
                    return "预处理器 (Preprocessors)";
                }
                return "模型加载与应用";
            }

            if (bucket === "批处理、列表、路由与逻辑") {
                if (id.includes("switch") || id.includes("select") || id.includes("router") || id.includes("route") || id.includes("choose") || id.includes("any")) {
                    return "控制流与路由";
                }
                if (id.includes("math") || id.includes("logic") || id.includes("add") || id.includes("subtract") || id.includes("multiply") || id.includes("compare")) {
                    return "逻辑与数学运算";
                }
                return "批处理与列表";
            }

            if (bucket === "图像输入输出与处理") {
                if (id.includes("load") || id.includes("save") || id.includes("preview") || id.includes("output")) {
                    return "输入输出 (I/O)";
                }
                if (id.includes("color") || id.includes("filter") || id.includes("contrast") || id.includes("brightness") || id.includes("blur") || id.includes("sharpen") || id.includes("blend")) {
                    return "图像色彩与滤镜";
                }
                return "基础图像变换";
            }

            if (bucket === "文本、提示词工具与通配符") {
                if (id.includes("wildcard") || id.includes("dynamic") || id.includes("preset")) {
                    return "提示词预处理 & 通配符";
                }
                if (id.includes("llm") || id.includes("gpt") || id.includes("translate") || id.includes("ai") || id.includes("ollama")) {
                    return "LLM与智能生成";
                }
                return "文本操作与拼接";
            }

            if (bucket === "视频、音频与时间序列") {
                if (id.includes("audio") || id.includes("voice") || id.includes("sound") || id.includes("lip")) {
                    return "音频处理与驱动";
                }
                if (id.includes("save") || id.includes("combine") || id.includes("encode") || id.includes("gif")) {
                    return "视频保存与编码";
                }
                if (id.includes("load") || id.includes("split") || id.includes("frames")) {
                    return "视频加载与帧提取";
                }
                return "多帧动画与插帧";
            }

            if (bucket === "采样、调度与噪声") {
                if (id.includes("scheduler") || id.includes("sigmas") || id.includes("align") || id.includes("guide")) {
                    return "调度器与步数 (Schedulers & Sigmas)";
                }
                if (id.includes("noise") || id.includes("seed") || id.includes("random")) {
                    return "噪声注入与控制";
                }
                return "基础采样器 (Samplers)";
            }

            if (bucket === "潜空间与画布") {
                if (id.includes("encode") || id.includes("decode") || id.includes("vae")) {
                    return "编码与解码 (VAE Encode/Decode)";
                }
                if (id.includes("composite") || id.includes("blend") || id.includes("mask")) {
                    return "潜空间混合与蒙版";
                }
                return "潜空间基础变换";
            }

            if (bucket === "放大、高清修复与细节增强") {
                if (id.includes("face") || id.includes("detailer") || id.includes("hand") || id.includes("restore") || id.includes("segs")) {
                    return "人脸与人体修复";
                }
                return "图像与潜空间超分";
            }

            if (bucket === "检测、分割、人脸与人体") {
                if (id.includes("seg") || id.includes("sam") || id.includes("mask") || id.includes("segment")) {
                    return "智能分割与蒙版提取 (SAM)";
                }
                return "人物检测与人脸分析";
            }

            if (bucket === "模型与资源加载") {
                if (id.includes("lora") || id.includes("lycoris")) {
                    return "微调模型加载 (LoRA/LyCORIS)";
                }
                if (id.includes("clip") || id.includes("controlnet") || id.includes("ipadapter") || id.includes("style")) {
                    return "特征与引导模型加载";
                }
                return "大模型与 VAE 加载";
            }

            if (bucket === "API、元数据与调试") {
                if (id.includes("metadata") || id.includes("pnginfo") || id.includes("exif")) {
                    return "元数据读写";
                }
                if (id.includes("api") || id.includes("fetch") || id.includes("http") || id.includes("webhook") || id.includes("websocket")) {
                    return "网络与外部API接口";
                }
                return "数据流调试与信息打印";
            }

            if (bucket === "训练、模型合并与模型修补") {
                if (id.includes("merge") || id.includes("blend") || id.includes("average")) {
                    return "模型合并";
                }
                return "模型修补与微调";
            }

            if (bucket === "基础生成链路") {
                if (id.includes("img2img") || id.includes("image") || id.includes("vaeencode")) {
                    return "图生图主干 (Img2Img Core)";
                }
                return "文生图主干 (Txt2Img Core)";
            }

            if (bucket === "3D、相机与空间") {
                return "空间/相机";
            }

            if (bucket === "其他 / 插件专用") {
                return "插件通用";
            }

            return "其他子类";
        }

        function renderFunctionalMap() {
            const container = document.getElementById("map-panel");
            if (!container) return;

            const sectionLabel = container.querySelector(".section-label");
            const mapDesc = container.querySelector("p");
            
            if (currentMapBucket === null) {
                // Main Level Map
                sectionLabel.innerHTML = `🗺️ 功能分类地图`;
                mapDesc.innerHTML = `点击下方地图上的分类卡片，可进入次级分类并检索具体节点。`;

                const counts = {};
                const descriptions = {};
                nodesData.forEach(node => {
                    const bucket = node.functional_bucket || node.functional_group || "其他 / 插件专用";
                    counts[bucket] = (counts[bucket] || 0) + 1;
                    if (!descriptions[bucket] && node.functional_description) {
                        descriptions[bucket] = node.functional_description;
                    }
                });

                functionMap.innerHTML = Object.entries(counts)
                    .sort((a, b) => b[1] - a[1])
                    .map(([bucket, count]) => `
                        <button class="function-card" data-bucket="${escapeHTML(bucket)}">
                            <div class="function-card-title">
                                <span>${escapeHTML(bucket)}</span>
                                <span class="function-card-count">${count}</span>
                            </div>
                            <div class="function-card-desc">${escapeHTML(descriptions[bucket] || "按节点名称和类型自动推断的功能分类分组。")}</div>
                        </button>
                    `).join("");

                document.querySelectorAll(".function-card").forEach(card => {
                    card.addEventListener("click", () => {
                        const bucket = card.getAttribute("data-bucket");
                        currentMapBucket = bucket;
                        renderFunctionalMap();
                    });
                });
            } else {
                // Subgroup Level Map
                sectionLabel.innerHTML = `🗺️ 功能分类地图 ➔ <span style="color: var(--primary);">${escapeHTML(currentMapBucket)}</span>`;
                mapDesc.innerHTML = `
                    <button class="btn btn-sm btn-cancel-note" onclick="goBackToMainMap()" style="margin-right: 8px; padding: 4px 10px; cursor: pointer; background: rgba(255,255,255,0.06); border: 1px solid var(--border-color); border-radius: 4px; color: white;">
                        ⬅️ 返回大地图
                    </button>
                    点击下方次级分类卡片，直接检索对应的具体功能节点。
                `;

                const counts = {};
                nodesData.forEach(node => {
                    const bucket = node.functional_bucket || node.functional_group || "其他 / 插件专用";
                    if (bucket !== currentMapBucket) return;
                    
                    const subgroup = getFunctionalSubgroup(node);
                    counts[subgroup] = (counts[subgroup] || 0) + 1;
                });

                functionMap.innerHTML = Object.entries(counts)
                    .sort((a, b) => b[1] - a[1])
                    .map(([subgroup, count]) => `
                        <button class="function-card" data-subgroup="${escapeHTML(subgroup)}">
                            <div class="function-card-title">
                                <span>${escapeHTML(subgroup)}</span>
                                <span class="function-card-count">${count}</span>
                            </div>
                            <div class="function-card-desc">${escapeHTML(subgroupDescriptions[subgroup] || "特定次级分类节点分组。")}</div>
                        </button>
                    `).join("");

                document.querySelectorAll(".function-card").forEach(card => {
                    card.addEventListener("click", () => {
                        const subgroup = card.getAttribute("data-subgroup");
                        
                        activeFilterType = "subgroup";
                        activeFilterPath = `${currentMapBucket} | ${subgroup}`;
                        visibleCount = 50;
                        
                        const breadcrumbs = document.getElementById("breadcrumbs");
                        breadcrumbs.innerHTML = `功能地图 ➔ ${escapeHTML(currentMapBucket)} ➔ <span>${escapeHTML(subgroup)}</span>`;
                        
                        switchPanel("explorer-panel");
                        renderNodes();
                    });
                });
            }
        }

        window.goBackToMainMap = function() {
            currentMapBucket = null;
            renderFunctionalMap();
        };

        // ComfyUI Integration Helpers
        function updateFloatingSelectionBar() {
            const bar = document.getElementById("floating-selection-bar");
            const badge = document.getElementById("selected-count-badge");
            const jumpLnk = document.getElementById("lnk-jump-comfyui");
            
            if (!bar) return;
            
            const count = selectedNodeIds.length;
            if (count > 0) {
                badge.innerText = count;
                jumpLnk.href = comfyuiAddr;
                bar.classList.add("show");
            } else {
                bar.classList.remove("show");
            }
        }

        function copySelectedNodesToClipboard() {
            if (selectedNodeIds.length === 0) return;
            
            const clipboardData = {
                templates: [],
                nodes: selectedNodeIds.map((id, index) => {
                    const node = nodesData.find(n => n.id === id);
                    return {
                        id: index + 100,
                        type: node ? node.id : id,
                        pos: [150 + index * 260, 150],
                        size: [210, 200],
                        flags: {},
                        order: index,
                        mode: 0,
                        properties: {},
                        widgets_values: []
                    };
                }),
                links: [],
                groups: [],
                config: {},
                extra: {},
                version: 0.4
            };
            
            const text = JSON.stringify(clipboardData, null, 2);
            
            copyToClipboard(text).then(() => {
                const toast = document.getElementById("toast");
                if (toast) {
                    toast.innerText = `已复制 ${selectedNodeIds.length} 个节点数据！在 ComfyUI 中按 Ctrl+V 即可粘贴导入！`;
                    toast.classList.add("show");
                    setTimeout(() => {
                        toast.classList.remove("show");
                    }, 4000);
                }
            }).catch(err => {
                console.error("Copy failed:", err);
                alert("复制失败，请检查浏览器剪贴板权限！");
            });
        }

        function copyToClipboard(text) {
            if (navigator.clipboard && window.isSecureContext) {
                return navigator.clipboard.writeText(text);
            } else {
                const textArea = document.createElement("textarea");
                textArea.value = text;
                textArea.style.position = "fixed";
                textArea.style.left = "-999999px";
                textArea.style.top = "-999999px";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                return new Promise((resolve, reject) => {
                    if (document.execCommand('copy')) {
                        resolve();
                    } else {
                        reject(new Error("Copy failed"));
                    }
                    textArea.remove();
                });
            }
        }

        // Glossary panel initialization
        function renderGlossary(query = "") {
            const q = query.trim().toLowerCase();
            const matched = glossaryTerms.filter(item => {
                if (!q) return true;
                const haystack = [
                    item.term,
                    ...(item.aliases || []),
                    item.definition,
                    item.example
                ].join(" ").toLowerCase();
                return haystack.includes(q);
            }).slice(0, 16);

            glossaryResults.innerHTML = matched.length ? matched.map(item => `
                <div class="term-card">
                    <div class="term-name">${escapeHTML(item.term)}</div>
                    <div class="term-alias">${escapeHTML((item.aliases || []).join(" / "))}</div>
                    <div class="term-definition">${escapeHTML(item.definition)}</div>
                    <div class="term-example">${escapeHTML(item.example)}</div>
                </div>
            `).join("") : `
                <div class="term-card" style="grid-column: 1 / -1;">
                    <div class="term-name">没有找到相关名词</div>
                    <div class="term-definition">换个关键词试试，例如“CLIP”“VAE”“CFG”。</div>
                </div>
            `;
        }

        function initGlossary() {
            const commonTerms = ["CLIP", "VAE", "LATENT", "CONDITIONING", "KSampler", "CFG", "Denoise", "ControlNet", "LoRA", "Flux", "SDXL"];
            glossaryChips.innerHTML = commonTerms.map(term => `<button class="glossary-chip" data-term="${term}">${term}</button>`).join("");
            document.querySelectorAll(".glossary-chip").forEach(chip => {
                chip.addEventListener("click", () => {
                    glossarySearch.value = chip.getAttribute("data-term");
                    renderGlossary(glossarySearch.value);
                });
            });
            glossarySearch.addEventListener("input", () => renderGlossary(glossarySearch.value));
            renderGlossary();
        }

        // Tree structure builders
        const packageTranslations = {
            "ComfyUI-Custom-Scripts": "Custom Scripts (自定义脚本/快捷工具)",
            "ComfyUI-Danbooru-Gallery": "Danbooru Gallery (画廊浏览器)",
            "ComfyUI-Impact-Pack": "Impact Pack (集成增强套件)",
            "ComfyUI-MakeComics": "Make Comics (漫画制作工具)",
            "ComfyUI-RequestNodes": "Request Nodes (网络请求/API对接)",
            "ComfyUI_AnimeCharacterSelect": "Anime Character Select (动漫角色选择)",
            "ComfyUI_Comfyroll_CustomNodes": "Comfyroll Studio (动画与排版套件)",
            "ComfyUI_GraftingRayman": "Grafting Rayman (拼图与布局工具)",
            "ComfyUI_Mira": "Mira (数学/逻辑/图像增强工具)",
            "ComfyUI_StringOps": "String Ops (字符串操作工具)",
            "LanPaint": "LanPaint (局域网绘画同步)",
            "cg-image-filter": "CG Image Filter (图像滤波与特效)",
            "civitai-toolkit": "Civitai Toolkit (Civitai 资源助手)",
            "comfy_openai_image_api": "OpenAI Image API (OpenAI 生图接口)",
            "comfyui-advanced-controlnet": "Advanced ControlNet (高级控制网)",
            "comfyui-boorubrowser": "Booru Browser (动漫图库浏览器)",
            "comfyui-easy-use": "EasyUse (易用节点套件)",
            "comfyui-impact-subpack": "Impact Subpack (Impact 辅助包)",
            "comfyui-inpaint-cropandstitch": "Inpaint Crop & Stitch (局部重绘裁剪缝合)",
            "comfyui-kjnodes": "KJNodes (万能辅助与视频特效工具)",
            "comfyui-lora-manager": "LoRA Manager (LoRA 资源管理器)",
            "comfyui-ollama": "Ollama (本地大语言模型对接)",
            "comfyui-prompt-control": "Prompt Control (提示词精细控制)",
            "comfyui-seedvr2-tilingupscaler": "Tiling Upscaler (平铺式放大器)",
            "comfyui-simplecounter": "Simple Counter (简易计数器)",
            "comfyui_controlnet_aux": "ControlNet Preprocessors (预处理器辅助包)",
            "comfyui_essentials": "ComfyUI Essentials (常用必备基础节点)",
            "comfyui_memory_cleanup": "Memory Cleanup (显存与内存清理工具)",
            "comfyui_ttp_toolset": "TTP Toolset (瓦片拼贴平铺工具)",
            "comfyui_xingtu_gpt_image": "Xingtu GPT Image (醒图/GPT 图像接口)",
            "conditioningnoiseinjection": "Noise Injection (潜空间噪声注入)",
            "layerforge": "LayerForge (图层混合与排版)",
            "pre_cfg_comfy_nodes_for_comfyui": "Pre-CFG Nodes (去噪阶段精细调整)",
            "prompt-assistant": "Prompt Assistant (提示词助手)",
            "promptmodels": "Prompt Models (提示词生成模型)",
            "rgthree-comfy": "rgthree (快捷节点与流程增强)",
            "seedvr2_videoupscaler": "Video Upscaler (视频放大器)",
            "wavespeed": "Wavespeed (视频光流与插帧)",
            "websocket_image_save": "Websocket Image Save (网络传输保存图像)",
            "weilin-comfyui-tools": "Weilin Tools (唯林节点工具)",
            "官方核心节点 (Core)": "官方核心节点 (Core)",
            "自定义插件 (Unknown)": "自定义插件 (Unknown)"
        };

        const categoryPartTranslations = {
            "3d": "3D 建模/空间",
            "Compositing": "图像合成 (Compositing)",
            "Geometry_estimation": "几何估计 (Geometry)",
            "Process": "图像处理 (Process)",
            "Shader": "着色器 (Shader)",
            "Xingtu": "醒图 (Xingtu)",
            "Transform": "图像变换 (Transform)",
            "Batch": "批处理 (Batch)",
            "Upscaling": "放大与超分 (Upscaling)",
            "Detection": "目标检测 (Detection)",
            "Filters": "滤波器 (Filters)",
            "Mask": "遮罩与蒙版 (Mask)",
            "Tools": "提示词工具 (Tools)",
            "3d_models": "3D 模型 (3D Models)",
            "Gligen": "GLIGEN 区域控制 (Gligen)",
            "Inpaint": "局部重绘 (Inpaint)",
            "Instructpix2pix": "Pix2Pix 指令生成",
            "Lotus": "Lotus 模型",
            "Ltxv": "LTXV 视频生成",
            "Stable_cascade": "Stable Cascade 级联",
            "Upscale_diffusion": "扩散放大 (Upscale Diffusion)",
            "Video_models": "视频模型 (Video Models)",
            "Style Model": "风格模型 (Style Model)",
            "Security": "文本安全过滤 (Security)",
            "Chroma_radiance": "Chroma Radiance (光影色彩)",
            "Pre cfg": "CFG 前置调整",
            "Channels_selectors": "通道选择 (Channels Selectors)",
            "Supir": "SUPIR 高清放大",
            "Unet": "UNet 微调",
            "Primitive": "元节点/原始值 (Primitive)",
            "Resolution master": "分辨率大师 (Resolution Master)",
            "Operations": "潜空间操作 (Operations)",
            "Qwen": "千问大模型 (Qwen)",
            "Sd3": "SD3 核心 (Sd3)",
            "Advanced": "高级进阶 (Advanced)",
            "Preprocessors": "视频预处理 (Preprocessors)",
            "Custom_sampling": "自定义采样 (Custom Sampling)",
            "Guiders": "引导器 (Guiders)",
            "Samplers": "采样器 (Samplers)",
            "Schedulers": "调度器 (Schedulers)",
            "Sigmas": "步数参数 (Sigmas)",
            "Guidance": "高级引导 (Guidance)",
            "Hooks": "模型钩子 (Hooks)",
            "Model_merging": "模型合并 (Model Merging)",
            "Model_specific": "特定模型合并",
            "essential": "基础核心 (Essential)",
            "legacy": "弃用/旧版 (Legacy)",
            "lora": "LoRA 微调 (Lora)",
            "xy grid": "XY 轴测试 (XY Grid)",
            "list": "列表操作 (List)",
            "core": "核心模块 (Core)",
            "upscale": "放大超分 (Upscale)",
            "aspect ratio": "画幅比例 (Aspect Ratio)",
            "controlnet": "控制网 (ControlNet)",
            "animation": "动画制作 (Animation)",
            "schedule": "动画调度 (Schedule)",
            "graphics": "图形设计 (Graphics)",
            "layout": "海报排版 (Layout)",
            "pattern": "纹理图案 (Pattern)",
            "filter": "滤镜特效 (Filter)",
            "template": "设计模板 (Template)",
            "text": "文字渲染 (Text)",
            "shape": "矢量形状 (Shape)",
            "other": "其它杂项 (Other)",
            "random": "随机生成 (Random)",
            "conditional": "条件分支 (Conditional)",
            "process": "过程处理 (Process)",
            "index": "索引获取 (Index)",
            "conversion": "类型转换 (Conversion)",
            "analyzer": "解析分析器 (Analyzer)",
            "gallery": "画廊展示 (Gallery)",
            "Weights": "控制网权重 (Weights)",
            "Reference": "参考图引导 (Reference)",
            "Sparsectrl": "稀疏控制 (SparseCtrl)",
            "Faces and poses estimators": "人脸与姿态估计",
            "Line extractors": "线稿提取 (Line Extractors)",
            "Normal and depth estimators": "法线与深度估计",
            "Optical flow": "光流估计 (Optical Flow)",
            "Others": "其它预处理 (Others)",
            "Pose keypoint postprocess": "姿态关键点后处理",
            "Recolor": "图像上色 (Recolor)",
            "Semantic segmentation": "语义分割",
            "T2iadapter-only": "T2I Adapter 预处理",
            "Tile": "分块平铺预处理",
            "Image analysis": "图像分析 (Image Analysis)",
            "Image batch": "图像批处理 (Image Batch)",
            "Image manipulation": "图像操作 (Image Manipulation)",
            "Image processing": "图像滤镜处理",
            "Image utils": "图像实用工具",
            "Mask batch": "遮罩批处理 (Mask Batch)",
            "Segmentation": "图像分割 (Segmentation)",
            "Utilities": "通用实用工具 (Utilities)",
            "attention_experiments": "注意力实验",
            "photomaker": "PhotoMaker 角色一致性",
            "stable_cascade": "Stable Cascade 级联",
            "For loop": "For 循环 (For Loop)",
            "Index switch": "索引切换 (Index Switch)",
            "Math": "数学计算 (Math)",
            "Switch": "多路开关 (Switch)",
            "Type": "类型转换 (Type)",
            "While loop": "While 循环 (While Loop)",
            "Pipe": "管道连接 (Pipe)",
            "Presampling": "预采样设置 (Presampling)",
            "Util": "实用工具 (Util)",
            "Xy inputs": "XY 测试输入 (XY Inputs)",
            "Loadimage": "单图加载 (Load Image)",
            "deprecated": "已弃用节点 (Deprecated)",
            "Hunyuanvideo": "混元视频 (Hunyuan Video)",
            "Instancediffusion": "实例扩散",
            "Latents": "潜空间操作 (Latents)",
            "Masking": "遮罩与蒙版 (Masking)",
            "Memory": "显存管理 (Memory)",
            "Misc": "杂项工具 (Misc)",
            "Model_loaders": "模型加载器 (Model Loaders)",
            "Torchcompile": "Torch 编译加速",
            "Wai_character_select": "角色选择 (Character Select)",
            "Velocator": "速度估计 (Velocator)",
            "Get request": "GET 请求 (Get Request)",
            "Post request": "POST 请求 (Post Request)",
            "Rest api": "REST API 接口 (Rest API)",
            "Keyvalue": "键值对 (KeyValue)",
            "File": "文件读写 (File)",
            "Functional": "函数与编程 (Functional)",
            "String": "字符串操作 (String)",
            "Tagger": "打标反推提示词",
            "Arithmetic": "算术运算 (Arithmetic)",
            "Numeral": "数字操作 (Numeral)",
            "essential": "基础核心 (Essential)",
            "Deprecated": "已弃用 (Deprecated)",
            "Qwen": "千问模型 (Qwen)",
            "Zimage": "ZImage 加载 (Zimage)",
            "Compositing": "图像合成 (Compositing)"
        };

        const nodeNameTranslations = {
            "KSampler": "KSampler (核心采样器)",
            "CheckpointLoaderSimple": "Load Checkpoint (加载大模型)",
            "CLIPTextEncode": "CLIP Text Encode (提示词编码)",
            "VAEDecode": "VAE Decode (VAE 解码)",
            "VAEEncode": "VAE Encode (VAE 编码)",
            "VAEEncodeForInpaint": "VAE Encode for Inpaint (局部重绘编码)",
            "LoadImage": "Load Image (加载单张图像)",
            "SaveImage": "Save Image (保存图像)",
            "PreviewImage": "PreviewImage (预览图像)",
            "EmptyLatentImage": "Empty Latent Image (空潜空间/新建画布)",
            "LoraLoader": "Load LoRA (加载 LoRA 模型)",
            "ControlNetLoader": "Load ControlNet (加载 ControlNet 模型)",
            "ApplyControlNet": "Apply ControlNet (应用 ControlNet 引导)",
            "ImageScale": "Scale Image (等比缩放图像)",
            "ImageScaleBy": "Scale Image by (按比例缩放图像)",
            "UpscaleModelLoader": "Load Upscale Model (加载超分模型)",
            "ImageUpscaleWithModel": "Upscale Image (使用模型超分放大)",
            "CLIPSetLastLayer": "CLIP Set Last Layer (CLIP 终止层设置)",
            "VAELoader": "Load VAE (加载 VAE 模型)",
            "UNETLoader": "Load Diffusion Model (加载 UNET 扩散模型)",
            "DualCFG(Combine)": "Dual CFG (双路 CFG 融合)",
            "Split Image with Alpha": "Split Image with Alpha (通道分离/提取透明通道)",
            "Split String on character": "Split String on character (按字符分割字符串)",
            "String to Float": "String to Float (字符串转浮点数)",
            "Float to String": "Float to String (浮点数转字符串)",
            "Int to String": "Int to String (整数转字符串)",
            "String to Int": "String to Int (字符串转整数)",
            "Concat String": "Concat String (合并字符串)",
            "Show Value": "Show Value (显示数值/字符串)",
            "Note": "Note (记事本/便签)",
            "Bypass": "Bypass (旁路/跳过节点)",
            "Math Expression": "Math Expression (数学公式计算)"
        };

        function translateNodeNameFallback(name) {
            if (!name) return name;
            if (name.includes(" (") && name.includes(")")) return name;

            let translated = name;
            const replacements = [
                [/LoaderSimple/g, "简易加载器"],
                [/Loader/g, "加载器"],
                [/Load /g, "加载"],
                [/Decode/g, "解码"],
                [/Encode/g, "编码"],
                [/Conditioning/g, "条件"],
                [/Sampler/g, "采样器"],
                [/Advanced/g, "高级"],
                [/Simple/g, "简易"],
                [/Image/g, "图像"],
                [/Mask/g, "遮罩"],
                [/Latent/g, "潜空间"],
                [/Upscale/g, "放大"],
                [/Model/g, "模型"],
                [/Scale/g, "缩放"],
                [/String/g, "字符串"],
                [/Float/g, "浮点数"],
                [/Int/g, "整数"],
                [/Boolean/g, "布尔值"],
                [/Combine/g, "合并"],
                [/Average/g, "平均"],
                [/Concat/g, "拼接"],
                [/Split/g, "拆分"],
                [/Crop/g, "裁剪"],
                [/Rotate/g, "旋转"],
                [/Flip/g, "翻转"],
                [/Invert/g, "反转"],
                [/Filter/g, "滤波器/滤镜"],
                [/Noise/g, "噪声"],
                [/Tiling/g, "平铺"],
                [/Preview/g, "预览"],
                [/Save/g, "保存"],
                [/Empty/g, "空"],
                [/Apply/g, "应用"],
                [/Select/g, "选择"],
                [/Vision/g, "视觉"],
                [/Text/g, "文本"],
                [/Inpaint/g, "局部重绘"],
                [/Cleanup/g, "清理"],
                [/Memory/g, "内存/显存"],
                [/Creator/g, "创建器"],
                [/Scheduler/g, "调度器"],
                [/Noise/g, "噪声"],
                [/Sigmas/g, "步数参数"],
                [/Output/g, "输出"],
                [/Input/g, "输入"],
                [/Selector/g, "选择器"],
                [/Merge/g, "合并"],
                [/Blend/g, "混合"],
                [/Math/g, "数学"],
                [/Expression/g, "表达式"],
                [/Detector/g, "检测器"],
                [/Detailer/g, "细节修饰器"],
                [/Upscaler/g, "放大器"],
                [/Manager/g, "管理器"],
                [/Batch/g, "批处理"],
                [/Utility/g, "实用工具"],
                [/Utilities/g, "实用工具"],
                [/Util/g, "工具"],
                [/To/g, "转"],
                [/to/g, "转"],
                [/For/g, "用于"],
                [/for/g, "用于"],
                [/With/g, "使用"],
                [/with/g, "使用"]
            ];

            let hasReplacements = false;
            replacements.forEach(([regex, repl]) => {
                if (regex.test(translated)) {
                    translated = translated.replace(regex, repl);
                    hasReplacements = true;
                }
            });

            if (hasReplacements && translated !== name) {
                return `${name} (${translated})`;
            }
            return name;
        }

        function getStandardTopCategory(node) {
            const cat = (node.category || "").toLowerCase();
            const transCat = (node.translated_category || "").toLowerCase();
            const fBucket = (node.functional_bucket || "").toLowerCase();
            const fGroup = (node.functional_group || "").toLowerCase();
            const node_id = (node.id || "").toLowerCase();

            // 1. 模型加载 (Loaders)
            if (cat.includes("loader") || transCat.includes("loader") || node_id.includes("loader") || transCat.includes("模型加载") || cat.includes("loaders") || cat.includes("patch") || transCat.includes("patch") || cat.includes("merge") || transCat.includes("merge") || transCat.includes("模型微调") || transCat.includes("模型合并")) {
                return "01. 模型加载 (Loaders)";
            }
            // 2. 提示词与条件 (Conditioning)
            if (cat.includes("conditioning") || transCat.includes("conditioning") || fBucket.includes("conditioning") || transCat.includes("提示词") || fGroup.includes("conditioning") || transCat.includes("条件") || fBucket.includes("提示词") || fBucket.includes("条件")) {
                return "02. 提示词与条件 (Conditioning)";
            }
            // 3. 采样器 (Sampling)
            if (cat.includes("sampling") || transCat.includes("sampling") || cat.includes("sampler") || transCat.includes("sampler") || transCat.includes("采样") || fBucket.includes("采样")) {
                return "03. 采样器 (Sampling)";
            }
            // 4. 潜空间 (Latent)
            if (cat.includes("latent") || transCat.includes("latent") || transCat.includes("潜空间") || fBucket.includes("潜空间")) {
                return "04. 潜空间 (Latent)";
            }
            // 5. 遮罩与蒙版 (Mask)
            if (cat.includes("mask") || transCat.includes("mask") || transCat.includes("遮罩") || transCat.includes("蒙版") || cat.includes("masking")) {
                return "07. 遮罩与蒙版 (Mask)";
            }
            // 6. 图像处理 (Image)
            if (cat.includes("image") || transCat.includes("image") || transCat.includes("图像") || fBucket.includes("图像") || fBucket.includes("image")) {
                if (node_id.includes("mask") || transCat.includes("mask") || transCat.includes("遮罩") || transCat.includes("蒙版")) {
                    return "07. 遮罩与蒙版 (Mask)";
                }
                return "05. 图像处理 (Image)";
            }
            // 7. 视频与动画 (Video)
            if (cat.includes("video") || transCat.includes("video") || transCat.includes("视频") || cat.includes("animation") || transCat.includes("动画") || fBucket.includes("视频") || fBucket.includes("动画") || fBucket.includes("video") || fBucket.includes("animation")) {
                return "06. 视频与动画 (Video)";
            }
            // 8. 音频处理 (Audio)
            if (cat.includes("audio") || transCat.includes("audio") || transCat.includes("音频") || cat.includes("sound") || fBucket.includes("音频") || fBucket.includes("audio")) {
                return "08. 音频处理 (Audio)";
            }
            // 9. 3D与空间 (3D & Space)
            if (cat.includes("3d") || transCat.includes("3d") || cat.includes("camera") || transCat.includes("相机") || fBucket.includes("3d") || fBucket.includes("空间")) {
                return "11. 3D与空间 (3D & Space)";
            }
            // 10. API与外部接口 (API & External)
            if (cat.includes("api") || transCat.includes("api") || cat.includes("request") || transCat.includes("request") || node_id.includes("webhook") || fBucket.includes("api") || fBucket.includes("network") || fBucket.includes("外部")) {
                return "12. API与外部接口 (API & External)";
            }
            // 11. 文本与逻辑 (Text & Logic)
            if (cat.includes("text") || transCat.includes("text") || cat.includes("string") || transCat.includes("string") || cat.includes("logic") || transCat.includes("逻辑") || transCat.includes("文本") || cat.includes("math") || fBucket.includes("文本") || fBucket.includes("逻辑") || fBucket.includes("math") || fBucket.includes("logic")) {
                return "09. 文本与逻辑 (Text & Logic)";
            }
            // 12. 流程与工具 (Utils)
            if (cat.includes("utils") || transCat.includes("utils") || transCat.includes("流程") || cat.includes("tool") || transCat.includes("工具") || cat.includes("util") || transCat.includes("util") || fBucket.includes("流程") || fBucket.includes("工具") || fBucket.includes("utils")) {
                return "10. 流程与工具 (Utils)";
            }

            // Fallback checking by bucket text
            if (fBucket.includes("图像")) return "05. 图像处理 (Image)";
            if (fBucket.includes("提示词")) return "02. 提示词与条件 (Conditioning)";
            if (fBucket.includes("采样")) return "03. 采样器 (Sampling)";
            if (fBucket.includes("潜空间")) return "04. 潜空间 (Latent)";
            if (fBucket.includes("遮罩") || fBucket.includes("蒙版")) return "07. 遮罩与蒙版 (Mask)";
            if (fBucket.includes("视频") || fBucket.includes("动画")) return "06. 视频与动画 (Video)";
            if (fBucket.includes("文本") || fBucket.includes("逻辑")) return "09. 文本与逻辑 (Text & Logic)";
            if (fBucket.includes("音频")) return "08. 音频处理 (Audio)";
            if (fBucket.includes("流程") || fBucket.includes("工具")) return "10. 流程与工具 (Utils)";

            return "13. 其它与未分类 (Others)";
        }

        function getModelCategory(node) {
            const name = (node.display_name || "").toLowerCase();
            const id = (node.id || "").toLowerCase();
            const desc = (node.description || "").toLowerCase();
            const pkg = (node.package || "").toLowerCase();
            
            if (id.includes("flux") || name.includes("flux")) {
                return "Flux 模型生态";
            }
            if (id.includes("zimage") || name.includes("zimage") || id.includes("xingtu") || name.includes("xingtu")) {
                return "ZImage (醒图)";
            }
            if (id.includes("hunyuan") || name.includes("hunyuan")) {
                return "腾讯混元 (Hunyuan)";
            }
            if (id.includes("ltx") || name.includes("ltx")) {
                return "LTX Video 视频生态";
            }
            if (id.includes("wan") || name.includes("wan")) {
                return "WanVideo (万里视频)";
            }
            if (id.includes("sdxl") || name.includes("sdxl")) {
                return "SDXL 核心生态";
            }
            if (id.includes("cascade") || name.includes("cascade")) {
                return "Stable Cascade 级联";
            }
            if (id.includes("sd3") || name.includes("sd3")) {
                return "SD3/SD3.5 核心";
            }
            if (id.includes("svd") || name.includes("svd") || id.includes("sv3d") || name.includes("sv3d")) {
                return "SVD 视频扩散";
            }
            if (id.includes("mochi") || name.includes("mochi")) {
                return "Mochi 视频生态";
            }
            if (id.includes("lumina") || name.includes("lumina") || id.includes("aura") || name.includes("aura")) {
                return "Lumina/Aura 其它模型";
            }
            
            // Check core vs custom packages
            if (pkg.includes("core") || pkg.includes("官方核心")) {
                return "ComfyUI 官方通用核心";
            }
            
            return "通用插件与工具";
        }

        function buildModelTree(nodes) {
            const root = {};
            nodes.forEach(node => {
                const modelCat = getModelCategory(node);
                if (!root[modelCat]) {
                    root[modelCat] = {
                        name: modelCat,
                        nodes: [],
                        children: {},
                        path: modelCat
                    };
                }
                root[modelCat].nodes.push(node);
            });
            return root;
        }

        function buildCategoryTree(nodes) {
            const root = {};
            nodes.forEach(node => {
                const pathStr = node.translated_category || "未分类 (Uncategorized)";
                const parts = pathStr.split(" ➔ ");
                
                // Replace the first part with the standard top category
                const stdTop = getStandardTopCategory(node);
                parts[0] = stdTop;
                
                let current = root;
                parts.forEach((part, index) => {
                    const currentPath = parts.slice(0, index + 1).join(" ➔ ");
                    if (!current[part]) {
                        current[part] = {
                            name: part,
                            nodes: [],
                            children: {},
                            path: currentPath
                        };
                    }
                    current[part].nodes.push(node);
                    current = current[part].children;
                });
            });
            return root;
        }

        function buildPackageTree(nodes) {
            const root = {};
            nodes.forEach(node => {
                const pkg = node.package || "自定义插件 (Unknown)";
                const pathStr = node.translated_category || "未分类 (Uncategorized)";
                const parts = pathStr.split(" ➔ ");
                
                if (!root[pkg]) {
                    root[pkg] = {
                        name: pkg,
                        nodes: [],
                        children: {},
                        path: pkg
                    };
                }
                root[pkg].nodes.push(node);
                
                let current = root[pkg].children;
                parts.forEach((part, index) => {
                    const currentPath = pkg + " | " + parts.slice(0, index + 1).join(" ➔ ");
                    if (!current[part]) {
                        current[part] = {
                            name: part,
                            nodes: [],
                            children: {},
                            path: currentPath
                        };
                    }
                    current[part].nodes.push(node);
                    current = current[part].children;
                });
            });
            return root;
        }

        // Track active tree header for fast deselection
        let activeTreeHeader = null;

        // Recursively render sidebar trees (no per-element listeners)
        function renderTree(treeNode, container, filterType, depth = 0) {
            const keys = Object.keys(treeNode).sort((a, b) => {
                if (a.includes("未分类") || a.includes("Unknown")) return 1;
                if (b.includes("未分类") || b.includes("Unknown")) return -1;
                return a.localeCompare(b, 'zh');
            });
            
            const ul = document.createElement("ul");
            ul.className = "tree-list";
            if (depth > 0) ul.style.display = "none";
            
            keys.forEach(key => {
                const item = treeNode[key];
                const hasChildren = Object.keys(item.children).length > 0;
                const li = document.createElement("li");
                li.className = "tree-item";
                
                const header = document.createElement("div");
                header.className = "tree-header";
                header.setAttribute("data-path", item.path);
                header.setAttribute("data-type", filterType);
                
                let toggleHTML = '';
                if (hasChildren) {
                    toggleHTML = `<span class="tree-toggle">▸</span>`;
                } else {
                    toggleHTML = `<span class="tree-toggle-empty"></span>`;
                }
                
                header.innerHTML = `
                    ${toggleHTML}
                    <span class="tree-name" title="${escapeHTML(key)}">${escapeHTML(key)}</span>
                    <span class="tree-count">${item.nodes.length}</span>
                `;
                
                li.appendChild(header);
                
                if (hasChildren) {
                    const childrenUl = renderTree(item.children, null, filterType, depth + 1);
                    li.appendChild(childrenUl);
                }
                
                ul.appendChild(li);
            });
            
            if (container) {
                container.innerHTML = "";
                container.appendChild(ul);
            }
            return ul;
        }

        // Single delegated click handler for a tree container
        function attachTreeDelegation(container, filterType) {
            container.addEventListener("click", (e) => {
                // Handle toggle click
                const toggle = e.target.closest(".tree-toggle");
                if (toggle) {
                    e.stopPropagation();
                    const li = toggle.closest(".tree-item");
                    const childrenUl = li && li.querySelector(":scope > .tree-list");
                    if (childrenUl) {
                        const isExpanded = childrenUl.style.display === "block";
                        childrenUl.style.display = isExpanded ? "none" : "block";
                        toggle.classList.toggle("expanded", !isExpanded);
                        toggle.innerText = isExpanded ? "▸" : "▾";
                    }
                    return;
                }
                
                // Handle header click (filter selection)
                const header = e.target.closest(".tree-header");
                if (header) {
                    if (activeTreeHeader) activeTreeHeader.classList.remove("active");
                    header.classList.add("active");
                    activeTreeHeader = header;
                    selectFilter(header.getAttribute("data-path"), header.getAttribute("data-type"));
                }
            });
        }

        // Initialize Trees
        function initTrees() {
            const catTree = buildCategoryTree(nodesData);
            const pkgTree = buildPackageTree(nodesData);
            
            renderTree(catTree, menuTreeContainer, "category");
            renderTree(pkgTree, pkgTreeContainer, "package");
            const modelTree = buildModelTree(nodesData);
            renderTree(modelTree, modelTreeContainer, "model");

            // Attach delegated event handlers to tree containers
            attachTreeDelegation(menuTreeContainer, "category");
            attachTreeDelegation(pkgTreeContainer, "package");
            attachTreeDelegation(modelTreeContainer, "model");

            // Filter package search input
            const pkgSearchInput = document.getElementById("pkg-search-input");
            if (pkgSearchInput) {
                pkgSearchInput.addEventListener("input", (e) => {
                    const query = e.target.value.toLowerCase().trim();
                    const treeItems = document.querySelectorAll("#pkg-tree > .tree-list > .tree-item");
                    treeItems.forEach(item => {
                        const name = item.querySelector(".tree-name").innerText.toLowerCase();
                        if (!query || name.includes(query)) {
                            item.style.display = "block";
                        } else {
                            item.style.display = "none";
                        }
                    });
                });
            }
        }

        // Copy question builder to clipboard
        window.copyAIQuestion = function(nodeId, displayName, requiredIn, optionalIn, outputs) {
            const req = requiredIn ? JSON.parse(decodeURIComponent(requiredIn)) : [];
            const opt = optionalIn ? JSON.parse(decodeURIComponent(optionalIn)) : [];
            const outs = outputs ? JSON.parse(decodeURIComponent(outputs)) : [];
            
            const reqNames = req.map(i => `${i.name}(${i.type})`).join(', ') || '无';
            const optNames = opt.map(i => `${i.name}(${i.type})`).join(', ') || '无';
            const outNames = outs.map(o => `${o.name}(${o.type})`).join(', ') || '无';
            
            const questionText = `我想学习 ComfyUI 中的 "${displayName}" (${nodeId}) 节点。请用通俗易懂的中文告诉我：\n` +
                                 `1. 这个节点具体是做什么用的？解决了什么问题？\n` +
                                 `2. 它的必填输入参数 [${reqNames}] 和可选参数 [${optNames}] 分别有什么作用，需要怎么填？\n` +
                                 `3. 它的输出参数 [${outNames}] 分别是什么，输出后通常连在哪些节点上？\n` +
                                 `4. 在工作流中，请给我举一个典型的使用场景 and 例子，谢谢！`;
            
            const el = document.createElement('textarea');
            el.value = questionText.replace(/\\n/g, '\n');
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            
            toast.classList.add("show");
            setTimeout(() => {
                toast.classList.remove("show");
            }, 3000);
        };

        // Render Cards inside Node Grid
        function renderNodes() {
            // Use DocumentFragment to batch DOM updates
            const fragment = document.createDocumentFragment();
            
            const filteredNodes = nodesData.filter(node => {
                if (activeFilterType === "category") {
                    const path = activeFilterPath;
                    const nodeCat = node.translated_category || "";
                    const nodeBucket = node.functional_bucket || "";
                    
                    if (nodeCat !== path && !nodeCat.startsWith(path + " ➔ ") && nodeBucket !== path) {
                        return false;
                    }
                } else if (activeFilterType === "subgroup") {
                    const path = activeFilterPath;
                    const parts = path.split(" | ");
                    const bucket = parts[0];
                    const subgroup = parts[1];
                    const nodeBucket = node.functional_bucket || node.functional_group || "其他 / 插件专用";
                    if (nodeBucket !== bucket) return false;
                    if (getFunctionalSubgroup(node) !== subgroup) return false;
                } else if (activeFilterType === "package") {
                    const path = activeFilterPath;
                    const parts = path.split(" | ");
                    const pkg = parts[0];
                    const catPath = parts[1] || "";
                    
                    if (node.package !== pkg) return false;
                    if (catPath) {
                        const nodeCat = node.translated_category || "";
                        if (nodeCat !== catPath && !nodeCat.startsWith(catPath + " ➔ ")) {
                            return false;
                        }
                    }
                } else if (activeFilterType === "model") {
                    if (getModelCategory(node) !== activeFilterPath) return false;
                } else if (activeFilterType === "bookmarks") {
                    if (!bookmarks.includes(node.id)) return false;
                } else if (activeFilterType === "notes") {
                    if (!notes[node.id]) return false;
                } else if (activeFilterType === "none" && !searchQuery) {
                    return false;
                }

                // Apply Main Search Query filtering
                if (searchQuery) {
                    const q = searchQuery.toLowerCase();
                    const nameMatch = String(node.id || "").toLowerCase().includes(q);
                    const dispMatch = String(node.display_name || "").toLowerCase().includes(q);
                    const descMatch = (node.description || "").toLowerCase().includes(q);
                    const catMatch = (node.category || "").toLowerCase().includes(q);
                    const transCatMatch = (node.translated_category || "").toLowerCase().includes(q);
                    const pkgMatch = (node.package || "").toLowerCase().includes(q);
                    const usageMatch = (node.usage_search || "").toLowerCase().includes(q);
                    const bucketMatch = (node.functional_bucket || "").toLowerCase().includes(q);
                    const subgroupMatch = (node.functional_subgroup || "").toLowerCase().includes(q);
                    const tagMatch = (node.task_tags || []).join(" ").toLowerCase().includes(q);
                    
                    if (!nameMatch && !dispMatch && !descMatch && !catMatch && !transCatMatch && !pkgMatch && !usageMatch && !bucketMatch && !subgroupMatch && !tagMatch) return false;
                }
                
                return true;
            });

            statusText.innerText = `找到 ${filteredNodes.length} 个节点`;

            if (filteredNodes.length === 0) {
                nodeGrid.innerHTML = `
                    <div class="empty-state" style="grid-column: 1 / -1;">
                        <svg width="64" height="64" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"/>
                        </svg>
                        <h3>没有匹配的节点</h3>
                        <p>请尝试更换搜索词，或清除左侧的过滤选择</p>
                    </div>
                `;
                loadMoreContainer.style.display = "none";
                return;
            }

            const sliced = filteredNodes.slice(0, visibleCount);
            
            sliced.forEach(node => {
                const isBookmarked = bookmarks.includes(node.id);
                const isSelected = selectedNodeIds.includes(node.id);
                const hasNote = !!notes[node.id];
                const noteText = notes[node.id] || "";
                const nodeDomId = safeDomId(node.id);
                
                const hasDescription = node.description && node.description.trim().length > 0;
                const usageGuideHTML = renderUsageGuide(node);

                const safeRequired = encodeURIComponent(JSON.stringify(node.required_inputs));
                const safeOptional = encodeURIComponent(JSON.stringify(node.optional_inputs));
                const safeOutputs = encodeURIComponent(JSON.stringify(node.outputs));

                // Generate inputs HTML
                let inputsHTML = "";
                if (node.required_inputs.length > 0 || node.optional_inputs.length > 0) {
                    inputsHTML += `<div class="io-section"><div class="io-title">输入插槽 (Inputs)</div><div class="io-list">`;
                    node.required_inputs.forEach(input => {
                        inputsHTML += `
                            <div class="io-item">
                                <span class="io-socket ${getSocketClass(input.type)}"></span>
                                <span class="io-name" title="${escapeHTML(input.name)}">${escapeHTML(input.name)}</span>
                                <span class="io-type" title="${escapeHTML(input.type)}">${escapeHTML(translateType(input.type))}</span>
                            </div>
                        `;
                    });
                    node.optional_inputs.forEach(input => {
                        inputsHTML += `
                            <div class="io-item" style="opacity: 0.7;">
                                <span class="io-socket ${getSocketClass(input.type)}" style="border: 1px dashed white;"></span>
                                <span class="io-name" title="${escapeHTML(input.name)}">${escapeHTML(input.name)} <i style="font-size:0.68rem; color:var(--text-muted)">(选填)</i></span>
                                <span class="io-type" title="${escapeHTML(input.type)}">${escapeHTML(translateType(input.type))}</span>
                            </div>
                        `;
                    });
                    inputsHTML += `</div></div>`;
                }

                // Generate outputs HTML
                let outputsHTML = "";
                if (node.outputs.length > 0) {
                    outputsHTML += `<div class="io-section"><div class="io-title">输出插槽 (Outputs)</div><div class="io-list">`;
                    node.outputs.forEach(output => {
                        outputsHTML += `
                            <div class="io-item">
                                <span class="io-socket ${getSocketClass(output.type)}"></span>
                                <span class="io-name" title="${escapeHTML(output.name)}">${escapeHTML(output.name)}</span>
                                <span class="io-type" title="${escapeHTML(output.type)}">${escapeHTML(translateType(output.type))}</span>
                            </div>
                        `;
                    });
                    outputsHTML += `</div></div>`;
                }

                // Description rendering
                let descHTML = "";
                if (hasDescription) {
                    descHTML = `<div class="node-description">${escapeHTML(node.description)}</div>`;
                }

                const card = document.createElement("div");
                card.className = `node-card ${isSelected ? 'selected' : ''}`;
                card.setAttribute("data-required", safeRequired);
                card.setAttribute("data-optional", safeOptional);
                card.setAttribute("data-outputs", safeOutputs);
                card.innerHTML = `
                    <div class="node-card-header">
                        <div class="node-select-wrap">
                            <input type="checkbox" class="node-select-checkbox" data-id="${node.id}" ${isSelected ? 'checked' : ''} title="选中以批量导入 ComfyUI">
                        </div>
                        <div class="node-title-group">
                            <h3 class="node-title">${escapeHTML(node.display_name)}</h3>
                            <div class="node-class-name">${escapeHTML(node.id)}</div>
                        </div>
                        <button class="bookmark-btn ${isBookmarked ? 'active' : ''}" data-id="${node.id}" title="收藏该节点">
                            <svg width="18" height="18" fill="${isBookmarked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.24.588 1.81l-3.97 2.883a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.971-2.883a1 1 0 00-1.18 0l-3.97 2.883c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.97-2.883c-.773-.57-.374-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                            </svg>
                        </button>
                    </div>

                    <div class="meta-badges">
                        <span class="package-badge" title="数据来源包">${escapeHTML(node.package || "核心节点 (Core)")}</span>
                        <span class="category-badge" title="${escapeHTML(node.category)}">${escapeHTML(node.translated_category)}</span>
                    </div>

                    ${descHTML}



                    ${usageGuideHTML}

                    ${inputsHTML}
                    ${outputsHTML}

                    <!-- User Custom Notes -->
                    <div class="notes-section">
                        <div class="notes-header">
                            <span class="notes-title">
                                📝 个人学习笔记 ${hasNote ? '✓' : ''}
                            </span>
                            <span style="font-size:0.75rem; color:var(--text-muted)">点击编辑 / 粘贴 AI 解释</span>
                        </div>
                        <div class="notes-content" id="note-display-${node.id}" style="display: ${hasNote ? 'block' : 'none'};">
                            ${escapeHTML(noteText)}
                        </div>
                        <div class="notes-editor" id="note-editor-${node.id}">
                            <textarea id="note-textarea-${node.id}" placeholder="在这里写下您的学习心得或连线技巧。">${escapeHTML(noteText)}</textarea>
                            <div class="notes-editor-actions">
                                <button class="btn btn-sm btn-cancel-note" data-id="${node.id}">取消</button>
                                <button class="btn btn-sm btn-save btn-save-note" data-id="${node.id}">保存笔记</button>
                            </div>
                        </div>
                    </div>
                `;

                fragment.appendChild(card);

                // Per-card listeners removed - handled by nodeGrid event delegation below
            });

            // Flush fragment to DOM in one reflow
            nodeGrid.innerHTML = "";
            nodeGrid.appendChild(fragment);

            if (filteredNodes.length > visibleCount) {
                loadMoreContainer.style.display = "flex";
            } else {
                loadMoreContainer.style.display = "none";
            }
        }

        window.toggleNotesEditor = function(nodeId) {
            const editor = document.getElementById(`note-editor-${nodeId}`);
            const display = document.getElementById(`note-display-${nodeId}`);
            if (editor.style.display === "flex") {
                editor.style.display = "none";
                if (notes[nodeId]) display.style.display = "block";
            } else {
                editor.style.display = "flex";
                display.style.display = "none";
                document.getElementById(`note-textarea-${nodeId}`).focus();
            }
        };

        window.saveNote = function(nodeId) {
            const val = document.getElementById(`note-textarea-${nodeId}`).value.trim();
            const display = document.getElementById(`note-display-${nodeId}`);
            const editor = document.getElementById(`note-editor-${nodeId}`);
            
            if (val) {
                notes[nodeId] = val;
                display.innerText = val;
                display.style.display = "block";
            } else {
                delete notes[nodeId];
                display.style.display = "none";
            }
            
            localStorage.setItem("comfyui_notes", JSON.stringify(notes));
            editor.style.display = "none";
            
            if (activeFilterType === "notes") {
                renderNodes();
            } else {
                const card = document.getElementById(`note-display-${nodeId}`).closest(".node-card");
                const notesTitle = card.querySelector(".notes-title");
                notesTitle.innerHTML = `📝 个人学习笔记 ${val ? '✓' : ''}`;
            }
        };

        // Search Input event listener
        searchInput.addEventListener("input", (e) => {
            searchQuery = e.target.value;
            visibleCount = 50;
            
            if (searchQuery.trim().length > 0) {
                const breadcrumbs = document.getElementById("breadcrumbs");
                breadcrumbs.innerHTML = `搜索结果 ➔ <span>“${escapeHTML(searchQuery)}”</span>`;
                switchPanel("explorer-panel");
                activeFilterType = "search";
            } else {
                switchPanel("home-panel");
                activeFilterType = "none";
            }
            renderNodes();
        });

        btnLoadMore.addEventListener("click", () => {
            visibleCount += 50;
            renderNodes();
        });

        // Quick search buttons click event
        quickSearchButtons.forEach(button => {
            button.addEventListener("click", () => {
                const query = button.getAttribute("data-query") || "";
                searchInput.value = query;
                searchQuery = query;
                visibleCount = 50;
                
                const breadcrumbs = document.getElementById("breadcrumbs");
                breadcrumbs.innerHTML = `搜索结果 ➔ <span>“${escapeHTML(searchQuery)}”</span>`;
                switchPanel("explorer-panel");
                activeFilterType = "search";
                
                renderNodes();
            });
        });

        // Event delegation for ALL card interactions (buttons + expansion)
        nodeGrid.addEventListener("click", (e) => {
            const card = e.target.closest(".node-card");
            if (!card) return;

            // Checkbox selection handler
            const selectCheckbox = e.target.closest(".node-select-checkbox");
            if (selectCheckbox) {
                e.stopPropagation();
                const id = selectCheckbox.getAttribute("data-id");
                const checked = selectCheckbox.checked;
                const idx = selectedNodeIds.indexOf(id);
                if (checked && idx === -1) {
                    selectedNodeIds.push(id);
                    card.classList.add("selected");
                } else if (!checked && idx !== -1) {
                    selectedNodeIds.splice(idx, 1);
                    card.classList.remove("selected");
                }
                updateFloatingSelectionBar();
                return;
            }

            // --- Delegated button handlers ---

            // AI question copy button
            const aiBtn = e.target.closest(".ai-question-btn");
            if (aiBtn) {
                e.stopPropagation();
                const nodeId = card.querySelector(".node-class-name").innerText;
                const displayName = card.querySelector(".node-title").innerText;
                // Get data from the card's data attributes
                const safeReq = card.getAttribute("data-required") || "";
                const safeOpt = card.getAttribute("data-optional") || "";
                const safeOut = card.getAttribute("data-outputs") || "";
                copyAIQuestion(nodeId, displayName, safeReq, safeOpt, safeOut);
                return;
            }

            // Bookmark button
            const bookmarkBtn = e.target.closest(".bookmark-btn");
            if (bookmarkBtn) {
                e.stopPropagation();
                const id = bookmarkBtn.getAttribute("data-id");
                const index = bookmarks.indexOf(id);
                if (index === -1) {
                    bookmarks.push(id);
                    bookmarkBtn.classList.add("active");
                    bookmarkBtn.querySelector("svg").setAttribute("fill", "currentColor");
                } else {
                    bookmarks.splice(index, 1);
                    bookmarkBtn.classList.remove("active");
                    bookmarkBtn.querySelector("svg").setAttribute("fill", "none");
                    if (activeFilterType === "bookmarks") {
                        renderNodes();
                    }
                }
                localStorage.setItem("comfyui_bookmarks", JSON.stringify(bookmarks));
                return;
            }

            // Notes header (toggle editor)
            const notesHeader = e.target.closest(".notes-header");
            if (notesHeader) {
                e.stopPropagation();
                const noteId = card.querySelector(".btn-save-note")?.getAttribute("data-id");
                if (noteId) toggleNotesEditor(noteId);
                return;
            }

            // Cancel note button
            const btnCancel = e.target.closest(".btn-cancel-note");
            if (btnCancel) {
                e.stopPropagation();
                toggleNotesEditor(btnCancel.getAttribute("data-id"));
                return;
            }

            // Save note button
            const btnSave = e.target.closest(".btn-save-note");
            if (btnSave) {
                e.stopPropagation();
                saveNote(btnSave.getAttribute("data-id"));
                return;
            }

            // Card expansion removed - all content shown by default
        });

        // Initialize App
        window.addEventListener("DOMContentLoaded", () => {
            document.querySelectorAll(".nav-menu .nav-item").forEach(item => {
                item.addEventListener("click", () => {
                    const targetPanel = item.getAttribute("data-target");
                    
                    if (targetPanel === "bookmarks-panel") {
                        selectFilter("", "bookmarks");
                    } else if (targetPanel === "notes-panel") {
                        selectFilter("", "notes");
                    } else {
                        switchPanel(targetPanel);
                    }
                    
                    // Clear search box when navigating tabs
                    searchInput.value = "";
                    searchQuery = "";
                });
            });

            // Show UI skeleton immediately, defer heavy work
            switchPanel("home-panel");
            
            // Defer heavy initialization to avoid blocking the main thread
            const deferInit = (fn) => {
                if (typeof requestIdleCallback !== 'undefined') {
                    requestIdleCallback(fn, { timeout: 200 });
                } else {
                    setTimeout(fn, 50);
                }
            };
            
            deferInit(() => {
                // Pre-process nodesData by rewriting translated_category, package and display_name
                nodesData.forEach(node => {
                    // Translate display name in place (already bilingual on disk, just use fallback ID if empty)
                    if (!node.display_name) {
                        node.display_name = node.id;
                    }

                    // Translate package in place
                    const rawPkg = node.package || "自定义插件 (Unknown)";
                    node.package = packageTranslations[rawPkg] || rawPkg;

                    // Translate category in place
                    const pathStr = node.translated_category || "未分类 (Uncategorized)";
                    const parts = pathStr.split(" ➔ ");
                    parts[0] = getStandardTopCategory(node);
                    for (let i = 1; i < parts.length; i++) {
                        parts[i] = categoryPartTranslations[parts[i]] || parts[i];
                    }
                    node.translated_category = parts.join(" ➔ ");
                });

                initTrees();
                deferInit(() => {
                    renderFunctionalMap();
                    deferInit(() => {
                        initGlossary();
                        
                        // Floating Bar Event Listeners
                        const btnCopySelected = document.getElementById("btn-copy-selected");
                        if (btnCopySelected) {
                            btnCopySelected.addEventListener("click", copySelectedNodesToClipboard);
                        }

                        const btnClearSelection = document.getElementById("btn-clear-selection");
                        if (btnClearSelection) {
                            btnClearSelection.addEventListener("click", () => {
                                selectedNodeIds = [];
                                document.querySelectorAll(".node-select-checkbox").forEach(cb => cb.checked = false);
                                document.querySelectorAll(".node-card.selected").forEach(c => c.classList.remove("selected"));
                                updateFloatingSelectionBar();
                            });
                        }

                        const btnConfigComfyui = document.getElementById("btn-config-comfyui");
                        if (btnConfigComfyui) {
                            btnConfigComfyui.addEventListener("click", () => {
                                const newAddr = prompt("请输入您的 ComfyUI 访问地址：", comfyuiAddr);
                                if (newAddr !== null) {
                                    const cleaned = newAddr.trim();
                                    if (cleaned) {
                                        comfyuiAddr = cleaned;
                                        localStorage.setItem("comfyui_addr", comfyuiAddr);
                                        updateFloatingSelectionBar();
                                    }
                                }
                            });
                        }
                    });
                });
            });
        });