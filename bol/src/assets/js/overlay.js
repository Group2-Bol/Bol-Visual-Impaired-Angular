function enableLoadingScreen()
{
    var loadingScreenDiv = document.getElementById("loading-screen");
    if(loadingScreenDiv.style.display !== 'none')
    {
        loadingScreenDiv.style.display = 'none';
    }
    else
    {
        loadingScreenDiv.style.display = 'block';
    }
}
