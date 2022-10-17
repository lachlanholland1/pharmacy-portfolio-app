const domainsTable = {
  domains_data: [
    {
      description: "Professionalism",
      iddomains: 1,
      status: "Active",
      title: "Domain 1",
    },
    {
      description: "Knowledge",
      iddomains: 2,
      status: "Active",
      title: "Domain 2",
    },
    {
      description: "Experience",
      iddomains: 3,
      status: "Active",
      title: "Domain 3",
    },
    {
      description: "Motivation",
      iddomains: 1,
      status: "Active",
      title: "Domain 4",
    },
  ],
};

// 1. ADD NEW MOCK DATA HERE LIKE ABOVE
const standardsTable = {
  standards_data: [
    {
      description: "Professionalism",
      idstandards: 1,
      status: "Active",
      title: "Standard 1",
    },
    {
      description: "Knowledge",
      idstandards: 2,
      status: "Active",
      title: "Standard 2",
    },
    {
      description: "Experience",
      idstandards: 3,
      status: "Active",
      title: "Standard 3",
    },
    {
      description: "Motivation",
      idstandards: 1,
      status: "Active",
      title: "Standard 4",
    },
  ],
};

const mockData = { domains_table: domainsTable, standards_table: standardsTable }; // 2. ADD HERE
export default mockData;
