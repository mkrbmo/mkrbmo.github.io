import os
import requests
import json

CLIENT_ID = os.getenv('STRAVA_CLIENT_ID')
CLIENT_SECRET = os.getenv('STRAVA_CLIENT_SECRET')
ACCESS_TOKEN = os.getenv('STRAVA_ACCESS_TOKEN')
ACTIVITY_IDS=None

# Fetch activity ids from .json file

with open ('activities.json') as file:
    activities = json.load(file)
    
    ACTIVITY_IDS=activities.get('activities')
    #ACTIVITY_IDS=activities.values()
print(ACTIVITY_IDS)


def get_gpx_data(activity_id):
    url = f'https://www.strava.com/api/v3/activities/{activity_id}/streams'
    headers = {
        'Authorization': f'Bearer {ACCESS_TOKEN}'
    }

    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        return response.content  # GPX data in the response content
    else:
        print(f'Error fetching GPX data: {response.status_code} - {response.text}')
        return None

def save_gpx_to_file(gpx_data, filename):
    with open(f'gpx_tracks/{filename}', 'wb') as file:
        file.write(gpx_data)
    print(f'GPX data saved to {filename}')

def main():
    for activity_id in ACTIVITY_IDS:
        gpx_data = get_gpx_data(activity_id)
        if gpx_data:
            save_gpx_to_file(gpx_data, activity_id)

if __name__ == '__main__':
    main()
