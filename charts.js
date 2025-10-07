/* ===================================
   TUMAG x ITSEasy - Charts & Interactions
   Style Evocon
   =================================== */

// Configuration globale des graphiques (Dark Modern Theme)
Chart.defaults.font.family = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";
Chart.defaults.font.size = 13;
Chart.defaults.font.weight = '500';
Chart.defaults.color = '#A0AEC0';

// Palette de couleurs Dark Premium
const colors = {
    primary: '#60A5FA',      // Bleu électrique
    primaryLight: '#93C5FD',
    primaryDark: '#3B82F6',
    secondary: '#8B5CF6',    // Violet
    success: '#34D399',      // Vert néon
    warning: '#FBBF24',      // Jaune/or
    danger: '#F87171',       // Rouge corail
    info: '#22D3EE',         // Cyan brillant
    purple: '#A78BFA',       // Violet clair
    pink: '#F472B6',         // Rose
    gray: '#64748B',         // Gris bleuté
    darkBg: '#0F172A',       // Fond très sombre
    cardBg: '#1E293B',       // Fond carte
    border: '#334155'        // Bordure
};

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    initCharts();
    addInteractions();
    initDragAndDrop();
});

// ===================================
// GRAPHIQUES PRINCIPAUX
// ===================================

function initCharts() {
    // Chart 1: Mini OEE Sparkline
    createSparkline('oeeChart', [78, 82, 85, 87, 89, 88, 87, 90], colors.primary);
    
    // Chart 2: Machines Actives
    createDonutChart('machinesChart', [12, 3], ['Actives', 'Arrêtées'], [colors.success, colors.danger]);
    
    // Chart 3: Production
    createSparkline('productionChart', [1050, 1100, 1180, 1200, 1250, 1220, 1240, 1250], colors.success);
    
    // Chart 4: Taux de Rebut
    createSparkline('rejectChart', [2.5, 2.3, 2.1, 1.9, 1.8, 1.7, 1.8, 1.8], colors.danger);
    
    // Chart 5: Graphique Principal - Évolution OEE 24h
    createMainOEEChart();
    
    // Chart 6: Comparaison des Machines
    createMachineComparisonChart();
}

// ===================================
// SPARKLINE (Petit graphique de tendance - Style Evocon)
// ===================================

function createSparkline(canvasId, data, color) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array(data.length).fill(''),
            datasets: [{
                data: data,
                borderColor: color,
                backgroundColor: hexToRGBA(color, 0.08),
                borderWidth: 3,
                fill: true,
                tension: 0.35,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointHoverBorderWidth: 2,
                pointBackgroundColor: color,
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    enabled: true,
                    backgroundColor: 'rgba(15, 23, 42, 0.98)',
                    padding: 12,
                    cornerRadius: 8,
                    displayColors: false,
                    titleFont: { size: 0 },
                    bodyFont: { size: 14, weight: '600' },
                    borderColor: 'rgba(96, 165, 250, 0.3)',
                    borderWidth: 1,
                    callbacks: {
                        title: () => '',
                        label: (context) => context.parsed.y.toFixed(1)
                    }
                }
            },
            scales: {
                x: { display: false },
                y: { display: false }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            },
            layout: {
                padding: 0
            }
        }
    });
}

// ===================================
// DONUT CHART (Graphique en anneau - Style Evocon)
// ===================================

function createDonutChart(canvasId, data, labels, backgroundColors) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: backgroundColors,
                borderWidth: 3,
                borderColor: '#fff',
                hoverOffset: 8,
                hoverBorderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.98)',
                    padding: 16,
                    cornerRadius: 8,
                    displayColors: true,
                    titleFont: { size: 14, weight: '700' },
                    bodyFont: { size: 13, weight: '600' },
                    borderColor: 'rgba(96, 165, 250, 0.3)',
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed;
                        }
                    }
                }
            },
            cutout: '72%',
            layout: {
                padding: 0
            }
        }
    });
}

// ===================================
// GRAPHIQUE PRINCIPAL OEE (Style Evocon)
// ===================================

function createMainOEEChart() {
    const ctx = document.getElementById('mainChart');
    if (!ctx) return;
    
    const labels = [];
    for (let i = 0; i < 24; i++) {
        labels.push(i + ':00');
    }
    
    // Données réalistes
    const oeeData = [78, 80, 82, 85, 87, 86, 89, 90, 88, 87, 85, 86, 88, 89, 91, 90, 88, 87, 85, 83, 82, 84, 86, 87];
    const availData = [85, 87, 88, 90, 92, 91, 93, 94, 93, 92, 90, 91, 92, 93, 95, 94, 93, 92, 90, 88, 87, 89, 91, 92];
    const perfData = [88, 89, 90, 91, 93, 92, 94, 95, 94, 93, 91, 92, 93, 94, 96, 95, 94, 93, 91, 90, 89, 91, 93, 94];
    
    // Gradient glow effect
    const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, hexToRGBA(colors.primary, 0.25));
    gradient.addColorStop(0.5, hexToRGBA(colors.primary, 0.08));
    gradient.addColorStop(1, hexToRGBA(colors.primary, 0.0));
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'OEE',
                    data: oeeData,
                    borderColor: colors.primary,
                    backgroundColor: gradient,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 10,
                    pointHoverBorderWidth: 4,
                    pointBackgroundColor: colors.primary,
                    pointBorderColor: colors.darkBg,
                    pointBorderWidth: 3,
                    shadowOffsetX: 0,
                    shadowOffsetY: 4,
                    shadowBlur: 12,
                    shadowColor: hexToRGBA(colors.primary, 0.4)
                },
                {
                    label: 'Disponibilité',
                    data: availData,
                    borderColor: colors.success,
                    backgroundColor: 'transparent',
                    borderWidth: 3,
                    borderDash: [8, 4],
                    fill: false,
                    tension: 0.35,
                    pointRadius: 0,
                    pointHoverRadius: 8,
                    pointHoverBorderWidth: 3,
                    pointBackgroundColor: colors.success,
                    pointBorderColor: '#fff',
                    pointBorderWidth: 3
                },
                {
                    label: 'Performance',
                    data: perfData,
                    borderColor: colors.warning,
                    backgroundColor: 'transparent',
                    borderWidth: 3,
                    borderDash: [8, 4],
                    fill: false,
                    tension: 0.35,
                    pointRadius: 0,
                    pointHoverRadius: 8,
                    pointHoverBorderWidth: 3,
                    pointBackgroundColor: colors.warning,
                    pointBorderColor: '#fff',
                    pointBorderWidth: 3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    align: 'start',
                    labels: {
                        usePointStyle: true,
                        pointStyle: 'circle',
                        padding: 20,
                        font: { size: 13, weight: '600' },
                        color: '#34495E'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(52, 73, 94, 0.95)',
                    padding: 16,
                    cornerRadius: 6,
                    titleFont: { size: 14, weight: '600' },
                    bodyFont: { size: 13, weight: '500' },
                    bodySpacing: 10,
                    displayColors: true,
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y.toFixed(1) + '%';
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        font: { size: 12, weight: '600' },
                        color: '#64748B',
                        maxRotation: 0,
                        autoSkip: true,
                        maxTicksLimit: 12,
                        padding: 10
                    }
                },
                y: {
                    beginAtZero: false,
                    min: 60,
                    max: 100,
                    grid: {
                        color: 'rgba(51, 65, 85, 0.6)',
                        drawBorder: false,
                        lineWidth: 1.5
                    },
                    ticks: {
                        font: { size: 12, weight: '600' },
                        color: '#64748B',
                        padding: 12,
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

// ===================================
// COMPARAISON DES MACHINES (Style Evocon)
// ===================================

function createMachineComparisonChart() {
    const ctx = document.getElementById('comparisonChart');
    if (!ctx) return;
    
    const machines = ['PRESSE-001', 'PRESSE-002', 'CABLE-001', 'CABLE-002', 'ASSEM-001', 'ASSEM-002'];
    const oeeData = [87.5, 85.2, 92.1, 78.6, 88.9, 83.4];
    const dispData = [92, 88, 95, 82, 91, 86];
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: machines,
            datasets: [
                {
                    label: 'OEE',
                    data: oeeData,
                    backgroundColor: colors.primary,
                    borderRadius: 6,
                    barPercentage: 0.7
                },
                {
                    label: 'Disponibilité',
                    data: dispData,
                    backgroundColor: colors.success,
                    borderRadius: 6,
                    barPercentage: 0.7
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    align: 'start',
                    labels: {
                        usePointStyle: true,
                        pointStyle: 'circle',
                        padding: 20,
                        font: { size: 13, weight: '600' },
                        color: '#34495E'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(52, 73, 94, 0.95)',
                    padding: 16,
                    cornerRadius: 6,
                    titleFont: { size: 14, weight: '600' },
                    bodyFont: { size: 13, weight: '500' },
                    bodySpacing: 10,
                    displayColors: true,
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y.toFixed(1) + '%';
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        font: { size: 11, weight: '500' },
                        color: '#7F8C9A',
                        maxRotation: 45,
                        minRotation: 45,
                        padding: 8
                    }
                },
                y: {
                    beginAtZero: false,
                    min: 60,
                    max: 100,
                    grid: {
                        color: 'rgba(127, 140, 154, 0.1)',
                        drawBorder: false,
                        lineWidth: 1
                    },
                    ticks: {
                        font: { size: 12, weight: '500' },
                        color: '#7F8C9A',
                        padding: 12,
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

// ===================================
// FONCTION DE MISE À JOUR DU DASHBOARD
// ===================================

// Stocker les instances des graphiques
let chartInstances = {
    oee: null,
    machines: null,
    production: null,
    reject: null,
    main: null,
    comparison: null
};

function updateDashboard(view, buttonElement) {
    // Mise à jour des boutons actifs
    document.querySelectorAll('.control-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    if (buttonElement) {
        buttonElement.classList.add('active');
    }
    
    // Animation de changement
    const metricsGrid = document.querySelector('.metrics-grid');
    metricsGrid.style.opacity = '0.5';
    metricsGrid.style.transform = 'scale(0.98)';
    
    setTimeout(() => {
        // Mettre à jour les données selon la vue
        updateChartData(view);
        // Animer les valeurs des cartes métriques
        animateMetricCards(view);
        metricsGrid.style.opacity = '1';
        metricsGrid.style.transform = 'scale(1)';
    }, 200);
}

function updateChartData(view) {
    const ctx = document.getElementById('mainChart');
    if (!ctx) return;
    
    // Données différentes selon la vue
    const dataByView = {
        oee: {
            title: 'Évolution OEE - Dernières 24h',
            datasets: [
                { label: 'OEE', data: generateRandomData(24, 75, 90), color: colors.primary },
                { label: 'Disponibilité', data: generateRandomData(24, 85, 95), color: colors.success },
                { label: 'Performance', data: generateRandomData(24, 80, 95), color: colors.warning }
            ]
        },
        performance: {
            title: 'Performance des Machines - Dernières 24h',
            datasets: [
                { label: 'Vitesse Réelle', data: generateRandomData(24, 1100, 1250), color: colors.primary },
                { label: 'Vitesse Théorique', data: Array(24).fill(1200), color: colors.danger },
                { label: 'Écart', data: generateRandomData(24, -100, 50), color: colors.warning }
            ]
        },
        quality: {
            title: 'Qualité de Production - Dernières 24h',
            datasets: [
                { label: 'Taux de Qualité', data: generateRandomData(24, 95, 100), color: colors.success },
                { label: 'Vitesse Bonnes Pièces', data: generateRandomData(24, 1100, 1200), color: colors.primary },
                { label: 'Vitesse Rebuts', data: generateRandomData(24, 10, 80), color: colors.danger }
            ]
        }
    };
    
    const viewData = dataByView[view] || dataByView.oee;
    
    // Mettre à jour le titre
    const titleElement = document.querySelector('.chart-section h3');
    if (titleElement) {
        titleElement.textContent = viewData.title;
    }
    
    // Détruire l'ancien graphique s'il existe
    if (chartInstances.main) {
        chartInstances.main.destroy();
        chartInstances.main = null;
    }
    
    // Attendre un peu avant de recréer pour éviter les conflits
    setTimeout(() => {
        createMainChartWithView(ctx, viewData, view);
    }, 100);
}

function createMainChartWithView(ctx, viewData, view) {
    // Créer le nouveau graphique
    const labels = [];
    for (let i = 0; i < 24; i++) {
        labels.push(i + ':00');
    }
    
    const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, hexToRGBA(viewData.datasets[0].color, 0.12));
    gradient.addColorStop(1, hexToRGBA(viewData.datasets[0].color, 0.0));
    
    chartInstances.main = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: viewData.datasets.map((dataset, index) => ({
                label: dataset.label,
                data: dataset.data,
                borderColor: dataset.color,
                backgroundColor: index === 0 ? gradient : 'transparent',
                borderWidth: 3,
                borderDash: index === 0 ? [] : [8, 4],
                fill: index === 0,
                tension: 0.35,
                pointRadius: 0,
                pointHoverRadius: 8,
                pointHoverBorderWidth: 3,
                pointBackgroundColor: dataset.color,
                pointBorderColor: '#fff',
                pointBorderWidth: 3
            }))
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    align: 'start',
                    labels: {
                        usePointStyle: true,
                        pointStyle: 'circle',
                        padding: 20,
                        font: { size: 13, weight: '600' },
                        color: '#34495E'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(52, 73, 94, 0.95)',
                    padding: 16,
                    cornerRadius: 6,
                    titleFont: { size: 14, weight: '600' },
                    bodyFont: { size: 13, weight: '500' },
                    bodySpacing: 10,
                    displayColors: true,
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            let suffix = '%';
                            if (view === 'performance' || (view === 'quality' && context.datasetIndex > 0)) {
                                suffix = ' pcs/h';
                            }
                            return context.dataset.label + ': ' + context.parsed.y.toFixed(1) + suffix;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        font: { size: 12, weight: '500' },
                        color: '#7F8C9A',
                        maxRotation: 0,
                        autoSkip: true,
                        maxTicksLimit: 12,
                        padding: 8
                    }
                },
                y: {
                    beginAtZero: view === 'quality',
                    grid: {
                        color: 'rgba(127, 140, 154, 0.1)',
                        drawBorder: false,
                        lineWidth: 1
                    },
                    ticks: {
                        font: { size: 12, weight: '500' },
                        color: '#7F8C9A',
                        padding: 12,
                        callback: function(value) {
                            if (view === 'performance') {
                                return value;
                            }
                            return value + '%';
                        }
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

function animateMetricCards(view) {
    const metricsData = {
        oee: [
            { value: '87.5%', title: 'OEE Global', trend: '+5.2%', trendType: 'positive' },
            { value: '80%', title: 'Machines Actives', trend: '12/15', trendType: 'neutral' },
            { value: '1,250', title: 'Production', trend: '+12%', trendType: 'positive' },
            { value: '1.8%', title: 'Taux de Rebut', trend: '-0.5%', trendType: 'positive' }
        ],
        performance: [
            { value: '91.7%', title: 'Performance Globale', trend: '+3.2%', trendType: 'positive' },
            { value: '1,150', title: 'Vitesse Moyenne', trend: 'pcs/h', trendType: 'neutral' },
            { value: '1,200', title: 'Vitesse Théorique', trend: 'pcs/h', trendType: 'neutral' },
            { value: '96%', title: 'Taux Atteinte', trend: '+2%', trendType: 'positive' }
        ],
        quality: [
            { value: '98%', title: 'Qualité Globale', trend: '+1.2%', trendType: 'positive' },
            { value: '1,180', title: 'Vitesse Bonnes Pièces', trend: 'pcs/h', trendType: 'neutral' },
            { value: '45', title: 'Vitesse Rebuts', trend: 'pcs/h', trendType: 'neutral' },
            { value: '2%', title: 'Taux de Défauts', trend: '-0.8%', trendType: 'positive' }
        ]
    };
    
    const data = metricsData[view] || metricsData.oee;
    const metricCards = document.querySelectorAll('.metric-card');
    
    metricCards.forEach((card, index) => {
        if (data[index]) {
            const valueEl = card.querySelector('.metric-value');
            const titleEl = card.querySelector('.metric-title');
            const trendEl = card.querySelector('.trend-badge');
            
            if (valueEl) valueEl.innerHTML = data[index].value.split(/(\d+)/).map(part => 
                /\d/.test(part) ? part : `<span class="unit">${part}</span>`
            ).join('');
            if (titleEl) titleEl.textContent = data[index].title;
            if (trendEl) {
                trendEl.textContent = data[index].trend;
                trendEl.className = 'trend-badge ' + data[index].trendType;
            }
        }
    });
}

function generateRandomData(count, min, max) {
    const data = [];
    for (let i = 0; i < count; i++) {
        data.push(min + Math.random() * (max - min));
    }
    return data;
}

// ===================================
// INTERACTIONS & ANIMATIONS
// ===================================

function addInteractions() {
    // Animation au scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
    
    // Animation des compteurs
    animateCounters();
    
    // Copier les formules
    document.querySelectorAll('.formula-code').forEach(code => {
        code.addEventListener('click', function() {
            const text = this.textContent;
            navigator.clipboard.writeText(text).then(() => {
                const tooltip = document.createElement('div');
                tooltip.textContent = '✓ Copié !';
                tooltip.style.cssText = 'position:absolute;background:#10B981;color:white;padding:8px 16px;border-radius:6px;font-size:13px;font-weight:600;margin-top:-40px;';
                this.parentElement.appendChild(tooltip);
                setTimeout(() => tooltip.remove(), 2000);
            });
        });
    });
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-value');
    counters.forEach(counter => {
        const target = parseFloat(counter.textContent.replace(/[^0-9.-]/g, ''));
        if (isNaN(target)) return;
        
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = counter.textContent.replace(/[0-9.-]+/, target.toFixed(0));
                clearInterval(timer);
            } else {
                counter.textContent = counter.textContent.replace(/[0-9.-]+/, current.toFixed(0));
            }
        }, 16);
    });
}

// ===================================
// UTILITAIRES
// ===================================

function hexToRGBA(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// ===================================
// DRAG & DROP DES INDICATEURS
// ===================================

function initDragAndDrop() {
    const draggables = document.querySelectorAll('.draggable');
    const container = document.getElementById('metricsGrid');
    
    if (!container) return;
    
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', handleDragStart);
        draggable.addEventListener('dragend', handleDragEnd);
    });
    
    container.addEventListener('dragover', handleDragOver);
    container.addEventListener('drop', handleDrop);
    container.addEventListener('dragenter', handleDragEnter);
    container.addEventListener('dragleave', handleDragLeave);
}

let draggedElement = null;

function handleDragStart(e) {
    draggedElement = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
    document.querySelectorAll('.draggable').forEach(item => {
        item.classList.remove('drag-over');
    });
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDragEnter(e) {
    if (e.target.classList.contains('draggable') && e.target !== draggedElement) {
        e.target.classList.add('drag-over');
    }
}

function handleDragLeave(e) {
    if (e.target.classList.contains('draggable')) {
        e.target.classList.remove('drag-over');
    }
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    
    if (draggedElement !== e.target && e.target.classList.contains('draggable')) {
        const container = document.getElementById('metricsGrid');
        const allCards = [...container.querySelectorAll('.draggable')];
        const draggedIndex = allCards.indexOf(draggedElement);
        const targetIndex = allCards.indexOf(e.target);
        
        if (draggedIndex < targetIndex) {
            e.target.parentNode.insertBefore(draggedElement, e.target.nextSibling);
        } else {
            e.target.parentNode.insertBefore(draggedElement, e.target);
        }
    }
    
    return false;
}

// ===================================
// FILTRES - PÉRIODE & MACHINES
// ===================================

function updatePeriod(period) {
    console.log('Période sélectionnée:', period);
    
    // Simuler le changement de période
    const periodLabels = {
        '1h': 'Dernière heure',
        '8h': '8 dernières heures',
        '24h': '24 dernières heures',
        '7d': '7 derniers jours',
        '30d': '30 derniers jours'
    };
    
    // Mettre à jour le titre du graphique
    const chartTitle = document.querySelector('.chart-section h3');
    if (chartTitle) {
        const currentView = chartTitle.textContent.split(' - ')[0];
        chartTitle.textContent = `${currentView} - ${periodLabels[period]}`;
    }
    
    // Animation de mise à jour
    const metricsGrid = document.querySelector('.metrics-grid');
    if (metricsGrid) {
        metricsGrid.style.opacity = '0.5';
        setTimeout(() => {
            metricsGrid.style.opacity = '1';
        }, 300);
    }
    
    // Afficher un toast de confirmation
    showToast(`📅 Période changée : ${periodLabels[period]}`);
}

function updateMachines(value) {
    console.log('Machine sélectionnée:', value);
    
    let message = '';
    if (value === 'all') {
        message = '🏭 Toutes les machines';
    } else {
        message = `🏭 Machine : ${value.toUpperCase()}`;
    }
    
    // Animation
    const metricsGrid = document.querySelector('.metrics-grid');
    if (metricsGrid) {
        metricsGrid.style.opacity = '0.5';
        setTimeout(() => {
            metricsGrid.style.opacity = '1';
        }, 300);
    }
    
    showToast(message);
}

// ===================================
// MENU TROIS POINTS - MASQUER/AFFICHER
// ===================================

function toggleCardMenu(event) {
    event.stopPropagation();
    const menu = event.target.nextElementSibling;
    const allMenus = document.querySelectorAll('.menu-dropdown');
    
    // Fermer tous les autres menus
    allMenus.forEach(m => {
        if (m !== menu) {
            m.classList.remove('active');
        }
    });
    
    // Toggle le menu actuel
    menu.classList.toggle('active');
    
    // Fermer le menu si on clique ailleurs
    document.addEventListener('click', function closeMenu(e) {
        if (!e.target.closest('.card-menu')) {
            menu.classList.remove('active');
            document.removeEventListener('click', closeMenu);
        }
    });
}

function toggleCardVisibility(event) {
    event.stopPropagation();
    const card = event.target.closest('.metric-card');
    const menu = event.target.closest('.menu-dropdown');
    
    if (card) {
        // Animation de disparition
        card.style.transform = 'scale(0.8)';
        card.style.opacity = '0';
        
        setTimeout(() => {
            card.classList.add('hidden');
            showToast('📊 Indicateur masqué. Rafraîchissez pour le réafficher.');
        }, 300);
    }
    
    // Fermer le menu
    if (menu) {
        menu.classList.remove('active');
    }
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #0066FF, #7C3AED);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        font-size: 14px;
        font-weight: 600;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Ajouter les animations CSS pour le toast
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
