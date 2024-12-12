document.addEventListener('DOMContentLoaded', () => {
    const wires = document.querySelectorAll('.wire');
    const targets = document.querySelectorAll('.target');
    let activeWire = null;

    const sounds = {
        wrong: new Audio('wrongconnection.mp3'),
        correct: new Audio('goodconnection.mp3'),
        doorOpen: new Audio('dooropen.mp3'),
    };

    // Dragging logic
    wires.forEach(wire => {
        wire.addEventListener('mousedown', (e) => {
            activeWire = wire;
            document.addEventListener('mousemove', onDrag);
            document.addEventListener('mouseup', onDrop);
        });
    });

    function onDrag(e) {
        if (!activeWire) return;

        const rect = activeWire.getBoundingClientRect();
        const dx = e.clientX - rect.left;
        const dy = e.clientY - rect.top;

        activeWire.style.width = `${dx}px`;
        
		
        
    }

    function onDrop(e) {
        document.removeEventListener('mousemove', onDrag);
        document.removeEventListener('mouseup', onDrop);

        if (activeWire) {
            const target = document.elementFromPoint(e.clientX, e.clientY);
            if (target && target.classList.contains('target')) {
                if (target.id === activeWire.dataset.target) {
                    target.style.backgroundColor = 'green';
                    sounds.correct.play();
                    activeWire.dataset.connected = 'true';
                } else {
                    target.style.backgroundColor = 'red';
                    sounds.wrong.play();
                    activeWire.dataset.connected = 'false';
                }
            }
        }

        activeWire = null;

        checkConnections();
    }

    function checkConnections() {
        const allConnected = Array.from(wires).every(wire => wire.dataset.connected === 'true');

        if (allConnected) {
            sounds.doorOpen.play();
            alert('The door opens!');
        }
    }
});
