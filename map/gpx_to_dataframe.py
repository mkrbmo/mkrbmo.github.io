import gpxpy
import gpxpy.gpx
import pandas as pd
import sys

def parsegpx(file):
    gpx_track = []
    with open(file, 'r') as gpxfile:
        try:
            gpx = gpxpy.parse(gpxfile)
            for track in gpx.tracks:
                for segment in track.segments:
                    for point in segment.points:
                        gpx_track.append({
                            'latitude': point.latitude,
                            'longitude': point.longitude
                        })
        except:
            print('file read error')
    track_df = pd.DataFrame(gpx_track)
    file_name = str(file).split('.')[0]+'.csv'
    print(file_name)
    track_df.to_csv(file_name, index=False)

if __name__ == "__main__":
    parsegpx(sys.argv[1])
    