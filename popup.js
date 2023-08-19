document.addEventListener('DOMContentLoaded', () => {
    const clipboardInput = document.getElementById('clipboardInput');
    const saveButton = document.getElementById('saveButton');
    const clearButton = document.getElementById('clearButton');
    const clipboardList = document.getElementById('clipboardList');
  
    saveButton.addEventListener('click', () => {
      const clipboardText = clipboardInput.value.trim();
  
      if (clipboardText) {
        chrome.storage.sync.get({ clipboards: [] }, (data) => {
          const clipboards = data.clipboards.slice(0, 9); // Limit to 10 items
          clipboards.unshift(clipboardText);
  
          chrome.storage.sync.set({ clipboards }, () => {
            clipboardInput.value = '';
            renderClipboardList();
          });
        });
      }
    });

    clearButton.addEventListener('click', () => {
        chrome.storage.sync.set({ clipboards: [] }, () => {
            renderClipboardList();
        });
    });
  
    function renderClipboardList() {
      clipboardList.innerHTML = '';
  
      chrome.storage.sync.get({ clipboards: [] }, (data) => {
        const clipboards = data.clipboards;
  
        clipboards.forEach((clipboard, index) => {
          const li = document.createElement('li');
          li.textContent = clipboard;
          clipboardList.appendChild(li);
        });
      });
    }
  
    renderClipboardList();
  });
  