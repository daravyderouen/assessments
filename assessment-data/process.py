log_file = open("um-server-01.txt")
#this command opens the file and imports the data from the file

def sales_reports(log_file):
    for line in log_file:
        line = line.rstrip()
        day = line[0:3]
        if day == "Mon":
            print(line)


sales_reports(log_file)
