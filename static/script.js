let currentPage = 1;
let perPage = 10;

function fetchJobs(page = 1, per_page = 10) {
    const techStack = document.getElementById('tech-stack').value.trim();

    if (techStack === '') {
        document.getElementById('job-list').innerHTML = '';
        document.getElementById('pagination').style.display = 'none';
        return;
    }

    const url = `/jobs?page=${page}&per_page=${per_page}&tech_stack=${techStack}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayJobs(data.jobs);
            displayPagination(data.page, data.total_pages);
        })
        .catch(error => console.error('Error fetching jobs:', error));
}

function displayJobs(jobs) {
    const jobList = document.getElementById('job-list');
    jobList.innerHTML = '';

    if (jobs.length === 0) {
        jobList.innerHTML = '<p>No jobs found.</p>';
        return;
    }

    jobs.forEach(job => {
        const jobItem = document.createElement('div');
        jobItem.classList.add('job-item');
        
        const profilePhoto = job.company_logo_url || 'https://via.placeholder.com/50';
        
        const jobHeader = `
            <div class="job-header">
                <img src="${profilePhoto}" alt="${job.company_name} logo" class="company-profile-photo" onerror="this.onerror=null;this.src='https://via.placeholder.com/50';" />
                <h3>${job.job_position} |</h3>
                <p><a href="${job.company_profile}" target="_blank">${job.company_name}</a></p>
            </div>
        `;
        
        const jobFooter = `
            <div class="job-footer">
                <div class="job-meta">
                    <p>${job.job_location}</p>
                    <p>Posted on: ${job.job_posting_date}</p>
                </div>
                <a href="${job.job_link}" target="_blank" class="button-86">Apply</a>
            </div>
        `;
        
        jobItem.innerHTML = jobHeader + jobFooter;
        jobList.appendChild(jobItem);
    });
}



function displayPagination(currentPage, totalPages) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    pagination.style.display = totalPages > 1 ? 'flex' : 'none';

    const prevBtn = document.createElement('button');
    prevBtn.innerText = '<';
    prevBtn.classList.toggle('disabled', currentPage === 1);
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener('click', () => fetchJobs(currentPage - 1));
    pagination.appendChild(prevBtn);

    const pageNumbers = [];
    if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    } else {
        if (currentPage <= 3) {
            pageNumbers.push(1, 2, 3, 4, '...');
        } else if (currentPage >= totalPages - 2) {
            pageNumbers.push('...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
        } else {
            pageNumbers.push('...', currentPage - 1, currentPage, currentPage + 1, '...');
        }
    }

    pageNumbers.forEach(page => {
        const pageBtn = document.createElement('button');
        pageBtn.innerText = page;
        pageBtn.classList.toggle('disabled', page === '...' || page === currentPage);
        if (page !== '...') {
            pageBtn.addEventListener('click', () => fetchJobs(page));
        }
        pagination.appendChild(pageBtn);
    });

    const nextBtn = document.createElement('button');
    nextBtn.innerText = '>';
    nextBtn.classList.toggle('disabled', currentPage === totalPages);
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener('click', () => fetchJobs(currentPage + 1));
    pagination.appendChild(nextBtn);
}

document.getElementById('search-btn').addEventListener('click', () => {
    currentPage = 1;
    fetchJobs(currentPage);
});

