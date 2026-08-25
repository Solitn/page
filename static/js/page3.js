// ===== 高考倒计时 =====
(function() {
    const TARGET = new Date('2028-06-09T18:15:00').getTime();

    function pad(num) {
        return String(num).padStart(2, '0');
    }

    function updateDisplay() {
        const now = Date.now();
        let diff = TARGET - now;

        if (diff <= 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = pad(days);
        document.getElementById('hours').textContent = pad(hours);
        document.getElementById('minutes').textContent = pad(minutes);
        document.getElementById('seconds').textContent = pad(seconds);
    }

    updateDisplay();
    setInterval(updateDisplay, 1000);
})();


// ===== 历程时间线（读取 JSON 中的 timeline 字段） =====
(function() {
    const container = document.getElementById('timeline-container');
    if (!container) return;

    fetch('static/js/data/works.json')
        .then(response => {
            if (!response.ok) throw new Error('网络请求失败');
            return response.json();
        })
        .then(data => {
            if (!data.timeline || data.timeline.length === 0) {
                container.innerHTML = '<p style="color: rgba(255,255,255,0.3); text-align:center; padding:20px;">暂无历程数据</p>';
                return;
            }
            renderTimeline(data.timeline);
        })
        .catch(error => {
            console.error('加载历程数据失败:', error);
            container.innerHTML = '<p style="color: rgba(255,255,255,0.3); text-align:center; padding:20px;">⏳ 数据加载中...</p>';
        });

    function renderTimeline(items) {
        const now = new Date();
        const currentMonth = now.getFullYear() + '.' + String(now.getMonth() + 1).padStart(2, '0');

        items.sort((a, b) => a.date.localeCompare(b.date));

        let html = '';
        items.forEach((item, index) => {
            const isActive = item.date === currentMonth || 
                (index > 0 && items[index - 1].date < currentMonth && item.date > currentMonth);
            const activeClass = isActive ? 'active' : '';

            html += `
                <div class="timeline-item ${activeClass}">
                    <div class="timeline-left">
                        <span class="timeline-date">${item.date}</span>
                        <div class="timeline-line-wrapper">
                            <span class="timeline-dot"></span>
                            <span class="timeline-line"></span>
                        </div>
                    </div>
                    <div class="timeline-content">
                        <div class="timeline-title">${item.title}</div>
                        <div class="timeline-desc">${item.description}</div>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;

        const activeItem = container.querySelector('.timeline-item.active');
        if (activeItem) {
            setTimeout(() => {
                activeItem.scrollIntoView({ block: 'center', behavior: 'smooth' });
            }, 300);
        }
    }
})();