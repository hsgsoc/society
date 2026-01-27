// --- Global Error Handling ---

// 1. Catch JavaScript Runtime Errors
window.onerror = function(message, source, lineno, colno, error) {
    console.error("System Error caught:", message);
    // If it's a critical script failure, send to server-down
    if (message.includes("fetch") || message.includes("Script error")) {
        window.location.href = "server-down.html";
    }
    return false;
};

// 2. Catch Failed Network Requests (API/Database)
window.addEventListener('unhandledrejection', function (event) {
    console.error('Database Connection Failed:', event.reason);
    window.location.href = "server-down.html";
});

// 3. Offline Detection
window.addEventListener('offline', () => {
    window.location.href = "server-down.html";
});