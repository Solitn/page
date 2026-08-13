// 备用数据（JSON 加载失败时使用）
const DEFAULT_WORKS = {
    categories: [
        {
            name: "示例分类",
            items: [
                { title: "示例项目", desc: "请创建 data/works.json 来替换", tag: "Demo" }
            ]
        }
    ]
};

// 1. 渲染函数
function renderWorks(data) {
    const container = document.getElementById('page2-works');
    const categories = data.categories;
    if (!categories) {
        return;
    }
    for (const category of categories) {
        const name = document.createElement('h2');
        name.textContent = category.name;
        container.appendChild(name);
        const area = document.createElement('div');
        area.className = 'work-area';
        for (const item of category.items) {
            let workCard;   // 在外部声明，避免块级作用域问题
            
            // 判断是否有 link 属性
            if ('link' in item) {
                workCard = document.createElement('a');
                workCard.href = item.link;
                workCard.target = '_blank';
            } else {
                workCard = document.createElement('div');
            }
            
            workCard.className = 'work-card';
            workCard.innerHTML = `
                <h3 class="title">${item.title}</h3>
                <p class="desc">${item.desc}</p>
                <span class="tag">${item.tag}</span>
            `;
            area.appendChild(workCard);
        }
        container.appendChild(area);
    }
}

// 2. 读取 JSON 并调用渲染
function loadWorks() {
    fetch('./static/js/data/works.json')
        .then(res => {
            if (!res.ok) throw new Error('加载失败');
            return res.json();
        })
        .then(data => renderWorks(data))
        .catch(err => {
            console.warn('使用备用数据', err);
            renderWorks(DEFAULT_WORKS);
        });
}

// 页面加载后自动执行
loadWorks();