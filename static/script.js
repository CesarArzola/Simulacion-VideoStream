document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. SUMAR "ME GUSTA" (Interacción 1)
    // ==========================================
    const likeBtn = document.getElementById('likeBtn');
    const likeIcon = document.getElementById('likeIcon');
    const likeCount = document.getElementById('likeCount');

    let isLiked = false;

    likeBtn.addEventListener('click', () => {
        isLiked = !isLiked;

        if (isLiked) {
            likeCount.textContent = '4,9 K';
            likeBtn.classList.add('active');
            likeIcon.classList.remove('fa-regular');
            likeIcon.classList.add('fa-solid');
        } else {
            likeCount.textContent = '4,8 K';
            likeBtn.classList.remove('active');
            likeIcon.classList.add('fa-regular');
            likeIcon.classList.remove('fa-solid');
        }
    });

    // ==========================================
    // 2. SUSCRIBIRSE (Interacción 2)
    // ==========================================
    const subscribeBtn = document.getElementById('subscribeBtn');
    const subCountText = document.getElementById('subCountText');

    let isSubscribed = false;

    subscribeBtn.addEventListener('click', () => {
        isSubscribed = !isSubscribed;

        if (isSubscribed) {
            subscribeBtn.textContent = 'Suscrito';
            subscribeBtn.classList.add('subscribed');
            subscribeBtn.innerHTML = '<i class="fa-regular fa-bell"></i> Suscrito';
            subCountText.textContent = '1,2 M de suscriptores (+1)';
            subCountText.style.color = '#065fd4';
            subCountText.style.fontWeight = 'bold';
        } else {
            subscribeBtn.textContent = 'Suscribirse';
            subscribeBtn.classList.remove('subscribed');
            subCountText.textContent = '1,2 M de suscriptores';
            subCountText.style.color = 'var(--text-secondary)';
            subCountText.style.fontWeight = 'normal';
        }
    });

    // ==========================================
    // 3. AÑADIR A LA COLA & NOTIFICACIÓN (Interacción 3)
    // ==========================================
    const queueList = document.getElementById('queueList');
    const toast = document.getElementById('toast');
    const closeToast = document.getElementById('closeToast');
    let toastTimer;

    function showToast(message) {
        document.getElementById('toastMessage').textContent = message;
        toast.classList.add('show');

        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    closeToast.addEventListener('click', () => {
        toast.classList.remove('show');
    });

    // Delegación de eventos para agregar a la cola desde Recomendados
    document.addEventListener('click', (e) => {
        const addBtn = e.target.closest('.add-queue-btn');
        if (addBtn) {
            const title = addBtn.dataset.title;
            const views = addBtn.dataset.views;
            const duration = addBtn.dataset.duration;
            const img = addBtn.dataset.img;

            // Crear nuevo elemento en la lista
            const newItem = document.createElement('div');
            newItem.className = 'side-item';
            newItem.innerHTML = `
        <div class="side-thumb">
          <img src="${img}" alt="${title}">
          <span class="mini-duration">${duration}</span>
        </div>
        <div class="side-details">
          <h4>${title}</h4>
          <p>VideoStream</p>
          <p>${views}</p>
        </div>
        <button class="remove-item-btn"><i class="fa-solid fa-xmark"></i></button>
      `;

            queueList.appendChild(newItem);
            showToast('Video añadido a la cola');
        }
    });

    // Añadir el video principal a la cola con el botón de la barra de acciones
    const addToQueueMainBtn = document.getElementById('addToQueueMainBtn');
    if (addToQueueMainBtn) {
        addToQueueMainBtn.addEventListener('click', () => {
            const newItem = document.createElement('div');
            newItem.className = 'side-item';
            newItem.innerHTML = `
        <div class="side-thumb">
          <img src="https://picsum.photos/id/1018/120/70" alt="Lagos y montañas">
          <span class="mini-duration">4:32</span>
        </div>
        <div class="side-details">
          <h4>Lagos y montañas</h4>
          <p>VideoStream</p>
          <p>95 mil visualizaciones</p>
        </div>
        <button class="remove-item-btn"><i class="fa-solid fa-xmark"></i></button>
      `;
            queueList.appendChild(newItem);
            showToast('Video añadido a la cola');
        });
    }

    // Limpiar cola entera
    const clearQueueBtn = document.getElementById('clearQueueBtn');
    clearQueueBtn.addEventListener('click', () => {
        queueList.innerHTML = '';
        showToast('La cola se ha limpiado');
    });

    // Eliminar elemento individual de la cola
    queueList.addEventListener('click', (e) => {
        const removeBtn = e.target.closest('.remove-item-btn');
        if (removeBtn) {
            const item = removeBtn.closest('.side-item');
            item.remove();
        }
    });

    // ==========================================
    // 4. REPRODUCIR AL PASAR EL MOUSE (Interacción 4)
    // ==========================================
    const previewVideos = document.querySelectorAll('.preview-video');

    previewVideos.forEach(video => {
        const container = video.closest('.thumbnail-wrapper') || video.closest('.side-thumb');

        if (container) {
            container.addEventListener('mouseenter', () => {
                video.play().catch(err => console.log("Autoplay bloqueado por el navegador:", err));
            });

            container.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0; // Reiniciar video al salir
            });
        }
    });

    // ==========================================
    // EXTRA: Mostrar más / menos en Descripción
    // ==========================================
    const toggleDescBtn = document.getElementById('toggleDescBtn');
    const descText = document.getElementById('descText');
    let descExpanded = false;

    toggleDescBtn.addEventListener('click', () => {
        descExpanded = !descExpanded;
        if (descExpanded) {
            descText.textContent = "Un recorrido por los lagos más hermosos de la Patagonia y sus montañas principales. Consejos, rutas y paisajes imperdibles para tu próxima aventura. Incluye itinerario completo de 5 días, recomendaciones de equipamiento y mejores épocas del año para visitar.";
            toggleDescBtn.innerHTML = 'Mostrar menos <i class="fa-solid fa-chevron-up"></i>';
        } else {
            descText.textContent = "Un recorrido por los lagos más hermosos de la Patagonia y sus montañas principales. Consejos, rutas y paisajes imperdibles.";
            toggleDescBtn.innerHTML = 'Mostrar más <i class="fa-solid fa-chevron-down"></i>';
        }
    });

});