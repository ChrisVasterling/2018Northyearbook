student_array = []
SA_len = len(student_array)
done = False


def saveStudent(student):
    print("saving...")
    with open("studentArray.txt", "a") as f:
        f.write(str(student) + ",\n")


def newStudent():
    student_array.append([])

def add_first_name(index):
    name = input("First name: ")
    student_array[index].append(name.lower()) # should always be index 0

def add_last_name(index):
    name = input("Last name: ")
    student_array[index].append(name.lower()) # should always be index 1

def add_page_numbers(index):
    print("type 'done' if finished or press enter to continue to new student")
    print("")
    student_array[index].append([])
    addingPages = True
    while addingPages:
        page = input("Page: ")
        if page.lower() == "":
            addingPages = False
        elif page.lower() == "done":
            global done # access global variable
            done = True
            addingPages = False
        else:
            student_array[index][2].append(page)

while not done:
    print("")
    # i is an index
    newStudent()
    i = SA_len
    add_first_name(i)
    add_last_name(i)
    add_page_numbers(i)
    saveStudent(student_array[i])
    if not done:
        SA_len = len(student_array)

print("DONE!")
