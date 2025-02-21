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
        {blog_posts}
        </div>
</body>
</html>
"""

POST_TEMPLATE = """
<div class="post">
            <input type="radio" name="accordion" id="{postNumber}">
            <label for="{postNumber}" class="title link">{title}</label>
            
            <span class="post-location">{location} ({date})</span>

            
                <div class="post-content">
                    
                    
                        {images}
                    
                    
                    
                        
                            
                        <div class="post-text">
                            <p>{content}</p>
                        </div>
                    </div>
                </div>
        
"""

def generate_blog_posts(csv_filename, output_filename):
    # Define an HTML template for each post




    
    # genereate html content depending on the number of images
    def prepareImageHTML(postNumber, numberOfImages, imageAlts):
        #conidition for no images
        if numberOfImages == "0":
            return ''
        #condition for one image, no slide incrementing buttons
        elif numberOfImages == "1":
            return f'''<div class="image-container">
            <img class="post-image active-image" src="images/{postNumber}/1.JPG" alt="{imageAlts[0]}">
            </div>'''
        else:
            imageHTML = f'<img class="post-image active-image" src="images/{postNumber}/1.JPG" alt="{imageAlts[0]}">'
            for imageNumber in range(1, int(numberOfImages)+1):
                if imageNumber == 1:
                    continue
                imageHTML += f'<img class="post-image" src="images/{postNumber}/{imageNumber}.JPG" alt="{imageAlts[imageNumber-1]}">'
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
                content=row['content']
            )
    
   
    
    # Write the generated HTML to a file
    with open(output_filename, 'w', encoding='utf-8') as f:
        f.write(HTML_TEMPLATE.format(blog_posts=blog_posts))

# Example usage
generate_blog_posts('blogContent.csv', 'index.html')
