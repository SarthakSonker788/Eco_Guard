document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('simulator-form');
    
    // Animate numbers for smooth UI transitions
    function animateValue(obj, start, end, duration, suffix = '', prefix = '') {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // Easing function for smoother animation (easeOutQuart)
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            let current = easeProgress * (end - start) + start;
            
            // Format number based on type
            if (Number.isInteger(end)) {
                obj.innerHTML = `${prefix}${Math.floor(current).toLocaleString()}${suffix}`;
            } else {
                obj.innerHTML = `${prefix}${current.toFixed(2)}${suffix}`;
            }
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                obj.innerHTML = `${prefix}${end.toLocaleString()}${suffix}`;
            }
        };
        window.requestAnimationFrame(step);
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const btn = form.querySelector('button');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Scanning Region...';
        btn.disabled = true;

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/simulate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            
            if (result.error) {
                alert(result.error);
                return;
            }

            // Update UI with results with a slight delay for better UX flow
            setTimeout(() => {
                updateDashboard(result);
            }, 300);
            
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to run simulation. Ensure the backend is running.');
        } finally {
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 300);
        }
    });

    function updateDashboard(data) {
        // Telemetry Data Updates
        animateValue(document.getElementById('val-total-trees'), 0, data.total_trees, 1200);
        animateValue(document.getElementById('val-trees-lost'), 0, data.trees_lost, 1200);
        animateValue(document.getElementById('val-permitted-limit'), 0, data.permitted_limit, 1200);

        // Metrics Grid Updates
        const elTreesRemaining = document.getElementById('val-trees-remaining');
        const elLossPercent = document.getElementById('val-tree-loss-percentage');
        const elAreaLost = document.getElementById('val-forest-area-lost');
        const elReplanting = document.getElementById('val-replanting-needed');

        animateValue(elTreesRemaining, 0, data.trees_remaining, 1200);
        animateValue(elLossPercent, 0, data.tree_loss_percentage, 1200, '%');
        animateValue(elAreaLost, 0, data.forest_area_lost, 1200, ' <small>m²</small>');
        animateValue(elReplanting, 0, data.replanting_needed, 1200);

        // Impact Grid Updates
        updateImpactCard('val-env-impact', data.env_impact);
        updateImpactCard('val-air-quality', data.air_quality);
        updateImpactCard('val-fire-risk', data.fire_risk);
        
        const elWildlife = document.getElementById('val-wildlife-impact');
        animateValue(elWildlife, 0, data.wildlife_impact, 1200, '<br><small>est. animals</small>');
        
        document.getElementById('val-temp-change').innerText = data.temp_change;
        
        const elLimitStatus = document.getElementById('val-limit-status');
        elLimitStatus.innerText = data.limit_status;
        elLimitStatus.className = 'impact-value ' + (data.limit_status === 'Limit Exceeded' ? 'text-danger' : 'text-success');

        // Alert Box Logic
        const alertBox = document.getElementById('alert-box');
        if (data.alert) {
            alertBox.classList.remove('hidden');
        } else {
            alertBox.classList.add('hidden');
        }
    }

    function updateImpactCard(elementId, value) {
        const el = document.getElementById(elementId);
        el.innerText = value;
        
        // Remove existing color classes
        el.classList.remove('text-success', 'text-warning', 'text-danger');
        
        // Add specific colors based on value
        if (['Low', 'Good', 'Within Limits'].includes(value)) {
            el.classList.add('text-success');
        } else if (['Moderate'].includes(value)) {
            el.classList.add('text-warning');
        } else if (['Severe', 'Poor', 'High', 'Limit Exceeded'].includes(value)) {
            el.classList.add('text-danger');
        }
    }
    
    // Trigger initial simulation on page load
    form.dispatchEvent(new Event('submit'));
});
