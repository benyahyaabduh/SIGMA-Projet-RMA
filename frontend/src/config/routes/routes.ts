import { AppRoute } from "types/AppRoute";
import { RoutePath } from "config/routes/path";
import {
  AccountCircleOutlined as ManageAccountsOutlinedIcon,
  AssignmentIndOutlined as ReceiptLongOutlined,
  FlagOutlined as FlagOutlinedIcon,
  HomeOutlined as HomeIcon,
  ListAltOutlined as ListAltOutlinedIcon,
  PersonOutlined as PeopleAltOutlinedIcon,
  RoomOutlined as RoomPreferencesOutlinedIcon,
  VisibilityOutlined as VisibilityOutlinedIcon,
  Policy as PolicyIcon,
} from "@mui/icons-material";
import DashboardPage from "app/PrivateApp/dashboard";
import messages from "config/i18n/messages";
import ListTierPage from "app/PrivateApp/tier/ListTierPage";
import EditTierPage from "app/PrivateApp/tier/EditTierPage";
import NewTierPage from "app/PrivateApp/tier/NewTierPage";
import RejectedTierPage from "app/PrivateApp/legacy/RejectedTierPage";
import ViewTierPage from "app/PrivateApp/tier/ViewTierPage";
import ViewRejectedPage from "app/PrivateApp/legacy/ViewRejectedPage";
import EditRejectedPage from "app/PrivateApp/legacy/EditRejectedPage";
import HistoryPage from "app/PrivateApp/history";
import ViewHistoryPage from "app/PrivateApp/history/viewHistory";
import AnnotationListPage from "app/PrivateApp/annotation";
import PolicyListPage from "app/PrivateApp/policy";
import PolicyHistoryPage from "app/PrivateApp/policy/history";
import AppetiteListPage from "app/PrivateApp/appetite";

const routes: Array<AppRoute> = [
  {
    key: "router-dashboard",
    title: "Accueil",
    description: "Accueil",
    path: RoutePath.DASHBOARD,
    isEnabled: true,
    icon: HomeIcon,
    component: DashboardPage,
  },
  {
    key: "router-tier",
    title: messages.tier,
    description: "Tier menu",
    isEnabled: true,
    icon: ReceiptLongOutlined,
    path: RoutePath.TIER,
    subRoutes: [
      {
        key: "router-tier-list",
        title: messages.tierList,
        description: "List of tiers",
        path: RoutePath.TIER_LIST,
        isEnabled: true,
        icon: FlagOutlinedIcon,
        authorities: [],
        component: ListTierPage,
      },
      {
        key: "router-tier-new",
        title: messages.newTier,
        description: "New Tier",
        path: RoutePath.TIER_NEW,
        isEnabled: true,
        isHidden: true,
        icon: RoomPreferencesOutlinedIcon,
        authorities: [],
        component: NewTierPage,
      },
      {
        key: "router-tier-edit",
        title: messages.editTier,
        description: "Edit Tier",
        path: RoutePath.TIER_EDIT,
        isEnabled: true,
        isHidden: true,
        icon: RoomPreferencesOutlinedIcon,
        authorities: [],
        component: EditTierPage,
      },
      {
        key: "router-tier-view",
        title: messages.viewTier,
        description: "View Tier",
        path: RoutePath.TIER_VIEW,
        isEnabled: true,
        isHidden: true,
        icon: VisibilityOutlinedIcon,
        authorities: [],
        component: ViewTierPage,
      },
      {
        key: "router-tier-history",
        title: messages.history,
        description: "Tier history",
        path: RoutePath.TIER_HISTORY_LIST,
        isEnabled: true,
        icon: ListAltOutlinedIcon,
        authorities: [],
        component: HistoryPage,
      },
      {
        key: "router-history-view",
        title: messages.viewHistory,
        description: "View History",
        path: RoutePath.TIER_HISTORY_VIEW,
        isEnabled: true,
        isHidden: true,
        icon: VisibilityOutlinedIcon,
        authorities: [],
        component: ViewHistoryPage,
      },
      {
        key: "router-annotation-list",
        title: messages.annotations,
        description: "List of annotations",
        path: RoutePath.ANNOTATION_LIST,
        isEnabled: true,
        icon: FlagOutlinedIcon,
        authorities: [],
        component: AnnotationListPage,
      },
      {
        key: "router-appetite-list",
        title: messages.appetites,
        description: "List of appetites",
        path: RoutePath.TIER_APPETITE_LIST,
        isEnabled: true,
        icon: FlagOutlinedIcon,
        authorities: [],
        component: AppetiteListPage,
      },
    ],
  },
  // {
  //   key: "router-history",
  //   title: messages.history,
  //   description: "Tier History",
  //   isEnabled: true,
  //   icon: ListAltOutlinedIcon,
  //   path: RoutePath.HISTORY,
  //   subRoutes: [
  //     {
  //       key: "router-tier-history",
  //       title: messages.history,
  //       description: "Tier history",
  //       path: RoutePath.HISTORY_LIST,
  //       isEnabled: true,
  //       icon: ListAltOutlinedIcon,
  //       authorities: [],
  //       component: HistoryPage,
  //     },
  //     {
  //       key: "router-history-view",
  //       title: messages.viewHistory,
  //       description: "View History",
  //       path: RoutePath.HISTORY_VIEW,
  //       isEnabled: true,
  //       isHidden: true,
  //       icon: VisibilityOutlinedIcon,
  //       authorities: [],
  //       component: ViewHistoryPage,
  //     },
  //   ],
  // },
  {
    key: "router-legacy",
    title: messages.sync,
    description: "Admin",
    path: RoutePath.TIER_LEGACY,
    isEnabled: true,
    icon: ManageAccountsOutlinedIcon,
    subRoutes: [
      {
        key: "router-legacy-list",
        title: messages.rejectedTier,
        description: "Rejected Tiers",
        path: RoutePath.TIER_LEGACY_LIST,
        isEnabled: true,
        icon: PeopleAltOutlinedIcon,
        component: RejectedTierPage,
        authorities: [],
      },
      {
        key: "router-legacy-view",
        title: messages.viewRejected,
        description: "View Tier Legacy",
        path: RoutePath.TIER_LEGACY_VIEW,
        isEnabled: true,
        isHidden: true,
        icon: VisibilityOutlinedIcon,
        authorities: [],
        component: ViewRejectedPage,
      },
      {
        key: "router-legacy-edit",
        title: messages.editRejected,
        description: "Edit Tier Legacy",
        path: RoutePath.TIER_LEGACY_EDIT,
        isEnabled: true,
        isHidden: true,
        icon: VisibilityOutlinedIcon,
        authorities: [],
        component: EditRejectedPage,
      },
    ],
  },
  // {
  //   key: "router-policy",
  //   title: messages.policy,
  //   description: "Policy",
  //   path: RoutePath.POLICY,
  //   isEnabled: true,
  //   icon: PolicyIcon,
  //   subRoutes: [
  //     {
  //       key: "router-policy-list",
  //       title: messages.policyList,
  //       description: "Policy List",
  //       path: RoutePath.POLICY_LIST,
  //       isEnabled: true,
  //       icon: PeopleAltOutlinedIcon,
  //       component: PolicyListPage,
  //       authorities: [],
  //     },
  //     {
  //       key: "router-policy-history",
  //       title: messages.history,
  //       description: "Policy history",
  //       path: RoutePath.POLICY_HISTORY_LIST,
  //       isEnabled: true,
  //       icon: PeopleAltOutlinedIcon,
  //       component: PolicyHistoryPage,
  //       authorities: [],
  //     },
  //     // {
  //     //   key: "router-policy-view",
  //     //   title: messages.viewRejected,
  //     //   description: "View Tier Legacy",
  //     //   path: RoutePath.TIER_LEGACY_VIEW,
  //     //   isEnabled: true,
  //     //   isHidden: true,
  //     //   icon: VisibilityOutlinedIcon,
  //     //   authorities: [],
  //     //   component: ViewRejectedPage,
  //     // },
  //     // {
  //     //   key: "router-legacy-edit",
  //     //   title: messages.editRejected,
  //     //   description: "Edit Tier Legacy",
  //     //   path: RoutePath.TIER_LEGACY_EDIT,
  //     //   isEnabled: true,
  //     //   isHidden: true,
  //     //   icon: VisibilityOutlinedIcon,
  //     //   authorities: [],
  //     //   component: EditRejectedPage,
  //     // },
  //   ],
  // },

  //AnnotationListPage
];

export default routes;
