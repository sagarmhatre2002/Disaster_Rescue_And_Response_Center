/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: achievements
 * Interface for Achievements
 */
export interface Achievements {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image */
  icon?: string;
  /** @wixFieldType date */
  dateAchieved?: Date | string;
  /** @wixFieldType number */
  impactMetric?: number;
  /** @wixFieldType url */
  callToActionUrl?: string;
}


/**
 * Collection ID: awarenessarticles
 * Interface for AwarenessArticles
 */
export interface AwarenessArticles {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  content?: string;
  /** @wixFieldType text */
  author?: string;
  /** @wixFieldType datetime */
  publicationDate?: Date | string;
  /** @wixFieldType text */
  summary?: string;
  /** @wixFieldType image */
  mainImage?: string;
  /** @wixFieldType text */
  category?: string;
}


/**
 * Collection ID: disastertypes
 * Interface for DisasterTypes
 */
export interface DisasterTypes {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  name?: string;
  /** @wixFieldType image */
  icon?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType text */
  risks?: string;
  /** @wixFieldType text */
  dos?: string;
  /** @wixFieldType text */
  donts?: string;
}


/**
 * Collection ID: emergencycontacts
 * Interface for EmergencyContacts
 */
export interface EmergencyContacts {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  contactName?: string;
  /** @wixFieldType text */
  phoneNumber?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType text */
  countryRegion?: string;
  /** @wixFieldType text */
  notes?: string;
}


/**
 * Collection ID: emergencyguides
 * Interface for EmergencyGuides
 */
export interface EmergencyGuides {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  guideTitle?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  preDisasterInstructions?: string;
  /** @wixFieldType text */
  duringDisasterInstructions?: string;
  /** @wixFieldType text */
  postDisasterInstructions?: string;
  /** @wixFieldType url */
  downloadablePdfUrl?: string;
  /** @wixFieldType image */
  thumbnailImage?: string;
}


/**
 * Collection ID: galleryimages
 * Interface for GalleryImages
 */
export interface GalleryImages {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType image */
  galleryImage?: string;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType date */
  dateTaken?: Date | string;
}


/**
 * Collection ID: leadershipteam
 * Interface for LeadershipTeam
 */
export interface LeadershipTeam {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  name?: string;
  /** @wixFieldType text */
  role?: string;
  /** @wixFieldType image */
  profilePicture?: string;
  /** @wixFieldType text */
  biography?: string;
  /** @wixFieldType url */
  linkedInUrl?: string;
}


/**
 * Collection ID: organizationtimeline
 * Interface for OrganizationTimeline
 */
export interface OrganizationTimeline {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  eventTitle?: string;
  /** @wixFieldType date */
  eventDate?: Date | string;
  /** @wixFieldType text */
  eventDescription?: string;
  /** @wixFieldType image */
  eventImage?: string;
  /** @wixFieldType url */
  learnMoreUrl?: string;
}


/**
 * Collection ID: rescueteams
 * Interface for RescueTeams
 */
export interface RescueTeams {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  teamName?: string;
  /** @wixFieldType text */
  rolesAndResponsibilities?: string;
  /** @wixFieldType text */
  contactEmail?: string;
  /** @wixFieldType text */
  contactPhone?: string;
  /** @wixFieldType text */
  deploymentAreas?: string;
  /** @wixFieldType image */
  teamBadge?: string;
}


/**
 * Collection ID: safezonelocations
 * Interface for SafeZoneLocations
 */
export interface SafeZoneLocations {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  locationName?: string;
  /** @wixFieldType text */
  locationType?: string;
  /** @wixFieldType number */
  latitude?: number;
  /** @wixFieldType number */
  longitude?: number;
  /** @wixFieldType text */
  tooltipDescription?: string;
  /** @wixFieldType url */
  iconUrl?: string;
  /** @wixFieldType text */
  colorCode?: string;
}


/**
 * Collection ID: volunteerregistrations
 * Interface for VolunteerRegistrations
 */
export interface VolunteerRegistrations {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  fullName?: string;
  /** @wixFieldType text */
  email?: string;
  /** @wixFieldType text */
  phoneNumber?: string;
  /** @wixFieldType text */
  skills?: string;
  /** @wixFieldType text */
  availability?: string;
  /** @wixFieldType text */
  pastExperience?: string;
  /** @wixFieldType image */
  uploadedIdDocument?: string;
  /** @wixFieldType datetime */
  registrationDate?: Date | string;
}
