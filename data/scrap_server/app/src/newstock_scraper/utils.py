from datetime import datetime

# datetime을 '연월일' 형태로 바꿔줌
def convert_date_to_str(date: datetime.date) -> str:
        return date.strftime("%Y%m%d")

def set_ranges(start_date, end_date):
    date_format = "%Y-%m-%d"  # Adjust format as needed

    # Convert string to datetime.date
    converted_start_date = datetime.strptime(start_date, date_format).date()
    converted_end_date = datetime.strptime(end_date, date_format).date()
    
    return converted_start_date, converted_end_date