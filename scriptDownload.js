fetch("versions.json")
    .then(response => response.json())
    .then(data => {

        const container = document.getElementById("versions");

        data.forEach(version => {

            const changes = version.changes
                .map(change => `<li>${change}</li>`)
                .join("");

            container.innerHTML += `
                <div class="card">

                    <h2>Version : ${version.version}</h2>

                    <p><strong>Changes :</strong></p>

                    <ul>
                        ${changes}
                    </ul>

                    <div class="buttons">

                        <a class="btn android"
                           href="${version.downloads.android}">
                           Android
                        </a>

                        <a class="btn windows"
                           href="${version.downloads.windows}">
                           Windows
                        </a>

                        <a class="btn ios"
                           href="${version.downloads.ios}"
                           onclick="iosAlert(event)"
                           >
                           iOS
                        </a>

                    </div>

                </div>
            `;
        });

    })
    .catch(error => console.error(error));

    function iosAlert(event) {
        event.preventDefault();
    
        Swal.fire({
            icon: "info",
            title: "Coming Soon",
            text: "The iOS version will be available soon!"
        });
    }