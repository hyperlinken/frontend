
replyshow = document.getElementById("replied");

function makeDraggable(element) {
    let isDragging = false;
    let startX = 0;
    let offsetX = 0;
    const maxDrag = 50; // Maximum drag distance

    function startDrag(event) {
        isDragging = true;
        let clientX = event.clientX || event.touches[0].clientX;
        startX = clientX - offsetX;
        element.style.transition = "none"; // Disable transition while dragging
    }

    function moveDrag(event) {
        if (!isDragging) return;
        let clientX = event.clientX || event.touches[0].clientX;
        let moveX = clientX - startX + 5; // Moves 5px extra to the right

        if (moveX > maxDrag) moveX = maxDrag; // Limit right movement
        if (moveX < 0) moveX = 0; // Prevent moving left

        element.style.transform = `translateX(${moveX}px)`;
        offsetX = moveX;

        // Auto-reset when max drag is reached
        if (offsetX >= maxDrag) {
            replyshow.innerText = element.querySelector("p").innerText;
            resetPosition(); 
        }
    }

    function resetPosition() {
        element.style.transition = "transform 0.3s ease-out"; // Smooth return effect
        element.style.transform = "translateX(0px)";
        offsetX = 0;
        isDragging = false;
    }

    function endDrag() {
        if (!isDragging) return;
        resetPosition(); // Reset when released
    }

    // Attach both mouse and touch event listeners
    element.addEventListener("mousedown", startDrag);
    document.addEventListener("mousemove", moveDrag);
    document.addEventListener("mouseup", endDrag);
    document.addEventListener("mouseleave", endDrag); // Resets if mouse leaves window

    element.addEventListener("touchstart", startDrag, { passive: true });
    document.addEventListener("touchmove", moveDrag, { passive: true });
    document.addEventListener("touchend", endDrag);
    document.addEventListener("touchcancel", endDrag); // Resets if touch is lost
}
