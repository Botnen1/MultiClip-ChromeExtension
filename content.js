document.addEventListener('copy', (event) => {
    const clipboardText = window.getSelection().toString();
  
    if (clipboardText) {
      chrome.storage.sync.get({ clipboards: [] }, (data) => {
        const clipboards = data.clipboards.slice(0, 9); // Limit to 10 items
        clipboards.unshift(clipboardText);
  
        chrome.storage.sync.set({ clipboards });
      });
    }
  });
  