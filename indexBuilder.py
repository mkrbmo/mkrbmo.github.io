import csv

 # Wrap the posts in an HTML structure
HTML_TEMPLATE = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>miles</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
     integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
     crossorigin=""/>
     <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
     integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
     crossorigin=""></script>
     <script src="leaflet.ajax.min.js"></script>
    <script src="script.js" defer></script>
    <script src="map.js" defer></script>
</head>
<body>
    
    
        
        <div id="map-container">
            <div id="map"></div>
        </div>

        <div id="navigation-container" >
            <a href="index.html" class="nav-item link">miles</a>
            <a href="about.html" class="nav-item link">about</a>
        </div>
        
        <div id="blog-container" >
        {content}
        </div>
</body>
</html>
"""

POST_TEMPLATE = """
<div class="post" id="{postNumber}" data-feature-count="{featureCount}">
            <input type="radio" name="accordion" id="post{postNumber}title" onclick="openPost(this.parentElement.id)">
            <label for="post{postNumber}title" class="title link">{title}</label>
            
            <span class="post-location">{location} ({date})</span>

            
                <div class="post-content">
                    
                    
                        {images}
                    
                    
                    
                        
                            
                        <div class="post-text">
                            <p>{content}</p>
                        </div>
                    </div>
                </div>
        
"""

ABOUT_TEMPLATE = """
<div class="post">
<div class="about-content">
<h2>about</h2>
            <p>Hello! I'm a maker, chemist, and aspiring software developer from the appalachian mountains. I currently reside in Seattle, Washington where I spend my free moments outside on two legs or two wheels. I'm passionate about music, creating things by hand, outdoor conservation and access, and cartography.
            </p>

        <a href="https://www.linkedin.com/in/mileskmo/" class="nav-item link" target="_blank"> - linkedin </a>
        <h2>experience</h2>
            <ul>
                <li><I>Research Technician</I>, Huue Biosciences - Berkeley, CA - 2021-22</li>
                <li><I>Laboratory Technician</I>, Bolt Threads - Emeryville, CA - 2020-21</li>
                <li><I>Advanced Laboratory Assistant</I>, Moorehead Labs - Chapel Hill, NC - 2016-20</li>
            </ul>
        <h2>education</h2>
            <ul>
                <li><I>City College of San Francisco</I> - San Francisco, CA - 2021-22
                    <p class="resume-item">- computer science curriculum centered around functional Python programming and development of versatile, efficient scripts</p>
                </li>

                <li><I>University of North Carolina at Chapel Hill - </I> Chapel Hill, NC - 2016-20
                    <p class="resume-item">- bachelor in chemistry and environmental science</p>
                    <p class="resume-item">- concentration in environmental sustainability and renewable energy</p>
                </li>

                <li><I>Joint Graduate School of Energy and Environment - </I> Bangkok, Thailand - 2019
                    <p class="resume-item">- graduate level environmental science curriculum focused on sustainability and atmospheric chemistry in Southeast Asia</p>
                    <p class="resume-item">- self-directed life cycle asssessment research</p>
                </li>
            </ul>
        
        <h2>skills</h2>
        <p>Python | SQL | Git | Test-Driven & REST API Development | Javascript | HTML | CSS | Intuitive Problem-solving | Communication | Organization</p>

        <h2>publications</h2>
            <ul>
                <li>"Third generation of photovoltaic panels: A life cycle assessment" <i>Renewable Energy</i>, 2020</li>
            </ul>
</div>
</div>
"""

def generate_index_file(csv_filename, output_filename):

    # genereate html content depending on the number of images
    def prepareImageHTML(postNumber, numberOfImages, imageAlts):
        #conidition for no images
        if numberOfImages == "0":
            return ''
        #condition for one image, no slide incrementing buttons
        elif numberOfImages == "1":
            return f'''<div class="image-container">
            <img class="post-image active-image" src="images/{postNumber}/1.jpeg" alt="{imageAlts[0]}">
            </div>'''
        else:
            imageHTML = f'<img class="post-image active-image" src="images/{postNumber}/1.jpeg" alt="{imageAlts[0]}">'
            for imageNumber in range(1, int(numberOfImages)+1):
                if imageNumber == 1:
                    continue
                imageHTML += f'<img class="post-image" src="images/{postNumber}/{imageNumber}.jpeg" alt="{imageAlts[imageNumber-1]}">'
            return f'''
            <div class="image-container">
            <a class="arrow" onclick="return decrementSlide(this)">&#10094;</a>
            {imageHTML}
            <a class="arrow" onclick="return incrementSlide(this)">&#10095;</a>
            </div>
            '''
    #store blog html content 
    blog_posts = ""

    with open(csv_filename, newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            
            #
            imagesHTML = prepareImageHTML(row['postNumber'], row['numberOfImages'], row['imageAlts'].split(','))

            blog_posts += POST_TEMPLATE.format(
                postNumber=row['postNumber'],
                title=row['title'],
                images = imagesHTML,
                location=row['location'],
                date=row['date'],
                content=row['content'],
                featureCount = row['featureCount']
            )
    
   
    
    # Write the generated HTML to a file
    with open(output_filename, 'w', encoding='utf-8') as f:
        f.write(HTML_TEMPLATE.format(content=blog_posts))

def generate_about_file(output_filename):
    with open(output_filename, 'w', encoding='utf-8') as f:
        f.write(HTML_TEMPLATE.format(content=ABOUT_TEMPLATE))


# Example usage
if __name__ == "__main__":
    generate_index_file('blogContent.csv', 'index.html')
    generate_about_file('about.html')
