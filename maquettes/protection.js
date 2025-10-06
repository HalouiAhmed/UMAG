/**
 * Protection Anti-Copie et Anti-Capture d'Écran
 * UMAG x ITSEasy - Document Confidentiel
 */

(function() {
    'use strict';

    // Protection contre le copier-coller
    document.addEventListener('copy', function(e) {
        e.preventDefault();
        showAlert('⚠️ La copie de contenu est désactivée pour ce document.');
        return false;
    });

    document.addEventListener('cut', function(e) {
        e.preventDefault();
        showAlert('⚠️ La copie de contenu est désactivée pour ce document.');
        return false;
    });

    document.addEventListener('paste', function(e) {
        e.preventDefault();
        return false;
    });

    // Désactiver le clic droit
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        showAlert('⚠️ Le clic droit est désactivé pour protéger le contenu.');
        return false;
    });

    // Protection contre les raccourcis clavier
    document.addEventListener('keydown', function(e) {
        // Liste des raccourcis bloqués
        const blockedKeys = [
            // Copie/Coupe
            (e.ctrlKey && (e.key === 'c' || e.key === 'C')),
            (e.ctrlKey && (e.key === 'x' || e.key === 'X')),
            // Sélectionner tout
            (e.ctrlKey && (e.key === 'a' || e.key === 'A')),
            // Sauvegarder
            (e.ctrlKey && (e.key === 's' || e.key === 'S')),
            // Imprimer
            (e.ctrlKey && (e.key === 'p' || e.key === 'P')),
            // Outils développeur
            (e.key === 'F12'),
            (e.ctrlKey && e.shiftKey && (e.key === 'i' || e.key === 'I')),
            (e.ctrlKey && e.shiftKey && (e.key === 'j' || e.key === 'J')),
            (e.ctrlKey && e.shiftKey && (e.key === 'c' || e.key === 'C')),
            // Afficher le code source
            (e.ctrlKey && (e.key === 'u' || e.key === 'U')),
            // Screenshot sur certains OS
            (e.key === 'PrintScreen' || e.key === 'Print'),
            (e.metaKey && e.shiftKey && (e.key === '3' || e.key === '4' || e.key === '5'))
        ];

        if (blockedKeys.some(condition => condition)) {
            e.preventDefault();
            showAlert('⚠️ Cette action est désactivée pour protéger le contenu.');
            return false;
        }
    });

    // Protection contre la sélection de texte
    document.onselectstart = function() {
        return false;
    };

    // Protection contre le glisser-déposer
    document.ondragstart = function() {
        return false;
    };

    // Protection CSS additionnelle
    const style = document.createElement('style');
    style.textContent = `
        * {
            -webkit-user-select: none !important;
            -moz-user-select: none !important;
            -ms-user-select: none !important;
            user-select: none !important;
            -webkit-touch-callout: none !important;
        }
        
        input, textarea {
            -webkit-user-select: text !important;
            -moz-user-select: text !important;
            -ms-user-select: text !important;
            user-select: text !important;
        }
    `;
    document.head.appendChild(style);

    // Désactiver la console (rend difficile l'inspection)
    (function() {
        const devtools = /./;
        devtools.toString = function() {
            this.opened = true;
        }
        
        const checkDevTools = setInterval(function() {
            if (devtools.opened) {
                alert('⚠️ Les outils de développement ne sont pas autorisés sur ce document confidentiel.');
                window.location.reload();
            }
            devtools.opened = false;
        }, 1000);
    })();

    // Protection anti-capture d'écran (floute lors de la perte de focus)
    let blurOverlay = null;
    
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // Page cachée (changement d'onglet, screenshot possible)
            if (!blurOverlay) {
                blurOverlay = document.createElement('div');
                blurOverlay.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: #0F172A;
                    z-index: 999999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: Inter, sans-serif;
                    color: #F1F5F9;
                    font-size: 2rem;
                    font-weight: 700;
                    flex-direction: column;
                    gap: 20px;
                `;
                blurOverlay.innerHTML = `
                    <div style="font-size: 4rem;">🔒</div>
                    <div>Document Confidentiel UMAG</div>
                    <div style="font-size: 1rem; color: #94A3B8;">Capture d\'écran interdite</div>
                `;
                document.body.appendChild(blurOverlay);
            }
        } else {
            // Page visible
            if (blurOverlay) {
                blurOverlay.remove();
                blurOverlay = null;
            }
        }
    });

    // Détection de changement de fenêtre (Alt+Tab, etc.)
    window.addEventListener('blur', function() {
        document.body.style.filter = 'blur(20px)';
        setTimeout(function() {
            if (!document.hasFocus()) {
                if (!blurOverlay) {
                    blurOverlay = document.createElement('div');
                    blurOverlay.style.cssText = `
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: #0F172A;
                        z-index: 999999;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-family: Inter, sans-serif;
                        color: #F1F5F9;
                        font-size: 2rem;
                        font-weight: 700;
                    `;
                    blurOverlay.innerHTML = '🔒 Document Confidentiel';
                    document.body.appendChild(blurOverlay);
                }
            }
        }, 100);
    });

    window.addEventListener('focus', function() {
        document.body.style.filter = 'none';
        if (blurOverlay) {
            blurOverlay.remove();
            blurOverlay = null;
        }
    });

    // Filigrane visible et persistant
    function addWatermark() {
        const watermark = document.createElement('div');
        watermark.id = 'umag-watermark';
        watermark.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            font-size: 4rem;
            font-weight: 900;
            color: rgba(96, 165, 250, 0.08);
            pointer-events: none;
            z-index: 9999;
            white-space: nowrap;
            user-select: none;
            font-family: Inter, sans-serif;
            letter-spacing: 2rem;
        `;
        watermark.textContent = 'UMAG CONFIDENTIEL';
        document.body.appendChild(watermark);

        // Empêcher la suppression du filigrane
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.removedNodes.length) {
                    mutation.removedNodes.forEach(function(node) {
                        if (node.id === 'umag-watermark') {
                            addWatermark();
                        }
                    });
                }
            });
        });

        observer.observe(document.body, { childList: true });
    }

    // Fonction pour afficher les alertes de manière moins intrusive
    let alertTimeout;
    function showAlert(message) {
        clearTimeout(alertTimeout);
        
        let alertBox = document.getElementById('protection-alert');
        if (!alertBox) {
            alertBox = document.createElement('div');
            alertBox.id = 'protection-alert';
            alertBox.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #EF4444, #DC2626);
                color: white;
                padding: 16px 24px;
                border-radius: 12px;
                font-family: Inter, sans-serif;
                font-weight: 600;
                font-size: 0.95rem;
                box-shadow: 0 8px 24px rgba(239, 68, 68, 0.4);
                z-index: 999999;
                animation: slideIn 0.3s ease;
            `;
            
            const styleSheet = document.createElement('style');
            styleSheet.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(400px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(400px); opacity: 0; }
                }
            `;
            document.head.appendChild(styleSheet);
            document.body.appendChild(alertBox);
        }
        
        alertBox.textContent = message;
        alertBox.style.animation = 'slideIn 0.3s ease';
        alertBox.style.display = 'block';
        
        alertTimeout = setTimeout(function() {
            alertBox.style.animation = 'slideOut 0.3s ease';
            setTimeout(function() {
                alertBox.style.display = 'none';
            }, 300);
        }, 3000);
    }

    // Initialisation au chargement
    window.addEventListener('load', function() {
        addWatermark();
        
        // Message dans la console
        console.clear();
        console.log('%c⚠️ DOCUMENT CONFIDENTIEL', 'color: #EF4444; font-size: 32px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
        console.log('%c🔒 Ce document est la propriété de UMAG et ITSEasy', 'color: #60A5FA; font-size: 16px; font-weight: bold;');
        console.log('%c⚖️ Toute reproduction, diffusion ou capture d\'écran non autorisée est interdite', 'color: #F59E0B; font-size: 14px;');
        console.log('%c© 2025 UMAG x ITSEasy - Tous droits réservés', 'color: #94A3B8; font-size: 12px;');
    });

    // Protection contre l'impression
    window.addEventListener('beforeprint', function(e) {
        e.preventDefault();
        showAlert('⚠️ L\'impression est désactivée pour ce document confidentiel.');
        return false;
    });

    // Désactiver l'impression via CSS
    const printStyle = document.createElement('style');
    printStyle.setAttribute('media', 'print');
    printStyle.textContent = `
        @page { size: 0; }
        body { display: none !important; }
        body::before {
            content: "DOCUMENT CONFIDENTIEL - IMPRESSION INTERDITE";
            display: block;
            font-size: 3rem;
            text-align: center;
            margin-top: 40vh;
            color: red;
        }
    `;
    document.head.appendChild(printStyle);

})();
