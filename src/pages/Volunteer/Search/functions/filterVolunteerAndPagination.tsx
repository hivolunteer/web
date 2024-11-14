import { Volunteer } from "../../../../interfaces";
import { VolunteerPage, VolunteerProps } from "../Interfaces";

function filterVolunteerAndPagination(props: VolunteerProps) {
  console.log(props)
  let filteredVolunteers: Volunteer[] = props.volunteersList.filter(({ first_name, last_name }: Volunteer) =>
    !props.search.length ||
    [first_name, last_name].some(field => field.toLowerCase().includes(props.search.toLowerCase()))
  );

  if (filteredVolunteers.length === 0)
    return [];

  let x = 0;
  let page = 1;
  let displayVolunteers: Array<VolunteerPage> = []
  filteredVolunteers.forEach((volunteer: any) => {
    if (x === 20) {
      x = 0;
      page += 1;
    }
    if (x === 0)
      displayVolunteers.push({ page: page, volunteers: [] })
    displayVolunteers[page - 1].volunteers.push(volunteer)
    x++
  })
  return displayVolunteers;
}

export default filterVolunteerAndPagination