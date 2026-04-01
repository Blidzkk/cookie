    // Discord Gorilla Event Automation Script
    // This script creates a rustic UI panel and automates gathering by simulating clicks on the selected button.
    // Paste this into the browser console on discord.com while the event is active.

    (function() {
        // Inject CSS for dark mode + moving panel
        const style = document.createElement('style');
        style.textContent = `
            body { background-color: #050505 !important; color: #f2f2f2 !important; }
            #gorilla-panel {
                position: fixed;
                top: 12px;
                right: 12px;
                width: 300px;
                background: rgba(10, 10, 12, 0.96);
                border: 3px solid #ff7f00;
                border-radius: 14px;
                padding: 14px;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                color: #f9f9f9;
                box-shadow: 0 0 30px rgba(0, 0, 0, 0.85);
                z-index: 100000;
                font-size: 14px;
                transition: transform 0.3s ease, border-color 0.6s ease;
                animation: panel-hover 4s infinite alternate;
            }
            @keyframes panel-hover {
                to { transform: translateY(4px); border-color: #00e5ff; }
            }
            #gorilla-panel h2 {
                text-align: center;
                margin-bottom: 12px;
                color: #ffb347;
                text-shadow: 0 0 6px #000;
                font-size: 18px;
            }
            #gorilla-panel button {
                width: 100%;
                margin: 6px 0;
                padding: 10px;
                background: linear-gradient(135deg, #333, #111);
                border: 1px solid #ff9d2f;
                border-radius: 6px;
                color: #fff;
                font-weight: bold;
                cursor: pointer;
                transition: background 0.2s, border-color 0.2s;
            }
            #gorilla-panel button:hover {
                background: linear-gradient(135deg, #111, #222);
                border-color: #adebff;
            }
            #gorilla-panel .status {
                margin-top: 10px;
                text-align: center;
                font-style: normal;
                color: #ffe87f;
            }
            #gorilla-panel input {
                width: 100%;
                margin: 6px 0;
                padding: 9px;
                border: 1px solid #ff9d2f;
                border-radius: 5px;
                background: #121212;
                color: #f8f8f8;
            }
            #gorilla-panel .resource-display { display: none; }
        `;
        document.head.appendChild(style);

        // Force dark mode for page
        document.body.style.backgroundColor = '#050505';
        document.body.style.color = '#f1f1f1';
        document.body.style.filter = 'none';

        // Create the panel
        const panel = document.createElement('div');
        panel.id = 'gorilla-panel';
        panel.innerHTML = `
            <h2>Gorilla Forge</h2>
            <button id="select-button">Select Button to Auto-Click</button>
            <button id="start-gathering">Start Auto-Click</button>
            <input type="number" id="click-speed" placeholder="Clicks per second (max 200)" min="1" max="200">
            <button id="stop-all">Stop All</button>
            <div class="status" id="status">Ready</div>
            <div class="resource-display" id="resources" style="display:none;"></div>
        `;
        document.body.appendChild(panel);

        // Variables
        let gatheringInterval;
        let clickTarget = null;

        // (No API resource helper is needed in auto-click-only mode)

        // Select target button for manual auto-click mode
        document.getElementById('select-button').addEventListener('click', () => {
            document.getElementById('status').textContent = 'Click the game button to auto-click...';
            document.addEventListener('click', function targetPicker(event) {
                if (event.target.closest('#gorilla-panel')) return; // skip clicks in panel
                event.preventDefault();
                clickTarget = event.target;
                document.getElementById('status').textContent = 'Selected button: ' + (clickTarget.textContent || clickTarget.tagName);
                document.removeEventListener('click', targetPicker);
            }, { once: true, capture: true });
        });

        // Start Auto-Click for selected button
        document.getElementById('start-gathering').addEventListener('click', () => {
            if (!clickTarget) {
                alert('Please select the click button first!');
                return;
            }
            if (gatheringInterval) clearInterval(gatheringInterval);
            let speed = parseInt(document.getElementById('click-speed')?.value) || 20;
            speed = Math.min(200, Math.max(1, speed));
            const interval = Math.max(40, Math.floor(1000 / speed));
            document.getElementById('status').textContent = `Auto-clicking at ${speed} CPS...`;
            gatheringInterval = setInterval(() => {
                clickTarget.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
            }, interval);
        });

        // Stop All
        document.getElementById('stop-all').addEventListener('click', () => {
            clearInterval(gatheringInterval);
            document.getElementById('status').textContent = 'Stopped';
        });

        // Initial fetch to get current data (assuming an endpoint to get user data)
        // Since not provided, perhaps fetch from crafting complete or something
        // For now, leave it
    })();
